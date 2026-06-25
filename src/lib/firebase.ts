import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  getDocFromServer 
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { PortfolioData } from "../types";
import firebaseConfig from "../../firebase-applet-config.json";

// Standard Firestore Operation Types for detailed diagnostic error logging
export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

/**
 * Handle and rethrow standardized JSON-formatted errors for system diagnostics
 */
export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
    },
    operationType,
    path,
  };
  console.error("Firestore Error Detailed Info:", JSON.stringify(errInfo, null, 2));
  throw new Error(JSON.stringify(errInfo));
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore targeting the specific enterprise database instance ID
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const storage = getStorage(app);

// Document paths
const PORTFOLIO_DOC_PATH = "portfolio/devendra";
const ADMIN_DOC_PATH = "admin/config";

/**
 * Connection Validation: Verifies connectivity to the targeted database instance
 */
async function testConnection() {
  try {
    const docRef = doc(db, "test", "connection");
    await getDocFromServer(docRef);
    console.log("Firebase Firestore Connection Verified Successfully!");
  } catch (error) {
    if (error instanceof Error && error.message.includes("the client is offline")) {
      console.error("CRITICAL: Failed to get document because the client is offline. Please check your network and Firebase configuration.");
    } else {
      console.warn("Connection test completed (or skipped if permissions restrict reading 'test/connection'):", error);
    }
  }
}
testConnection();

/**
 * Fetch portfolio data from Firestore, or initialize with fallback if not found
 */
export async function getPortfolioFromFirebase(fallbackData: PortfolioData): Promise<PortfolioData> {
  try {
    const docRef = doc(db, PORTFOLIO_DOC_PATH);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as PortfolioData;
    } else {
      // Document doesn't exist yet, initialize it with fallbackData
      await setDoc(docRef, fallbackData);
      return fallbackData;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, PORTFOLIO_DOC_PATH);
    return fallbackData;
  }
}

/**
 * Save portfolio data to Firestore
 */
export async function savePortfolioToFirebase(data: PortfolioData): Promise<boolean> {
  try {
    const docRef = doc(db, PORTFOLIO_DOC_PATH);
    await setDoc(docRef, data);
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, PORTFOLIO_DOC_PATH);
    return false;
  }
}

/**
 * Check admin password against Firestore, or use default password
 */
export async function checkAdminPassword(password: string): Promise<boolean> {
  try {
    const docRef = doc(db, ADMIN_DOC_PATH);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.password === password;
    } else {
      // Default password is "admin123", store it in Firestore for the future
      await setDoc(docRef, { password: "admin123" });
      return password === "admin123";
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, ADMIN_DOC_PATH);
    return password === "admin123";
  }
}

/**
 * Update admin password in Firestore
 */
export async function updateAdminPasswordInFirebase(newPassword: string): Promise<boolean> {
  try {
    const docRef = doc(db, ADMIN_DOC_PATH);
    await setDoc(docRef, { password: newPassword });
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, ADMIN_DOC_PATH);
    return false;
  }
}

/**
 * Upload a file with a triple-redundant self-healing fallback strategy:
 * 1. Firebase Storage with a strict 2.5-second timeout (avoids SDK hanging on retries)
 * 2. Express local API /api/upload as a fast server-side fallback
 * 3. Client-side Base64 encoding stored directly in Firestore
 */
export async function uploadFileToFirebase(
  file: File | Blob,
  fileName: string,
  fileType: string
): Promise<{ url: string; sizeStr: string }> {
  const sizeInKb = Math.round(file.size / 1024);
  const sizeStr = sizeInKb > 1024 ? `${(sizeInKb / 1024).toFixed(1)} MB` : `${sizeInKb} KB`;

  // 1. Try Firebase Storage with a 2.5 second timeout
  try {
    const storagePromise = (async () => {
      const storagePath = `uploads/${fileType}/${Date.now()}_${fileName}`;
      const storageRef = ref(storage, storagePath);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return { url, sizeStr };
    })();

    const timeoutPromise = new Promise<{ url: string; sizeStr: string }>((_, reject) =>
      setTimeout(() => reject(new Error("Firebase Storage upload timed out")), 2500)
    );

    // Race the upload against the 2.5s timeout
    return await Promise.race([storagePromise, timeoutPromise]);
  } catch (storageError) {
    console.warn(
      "Firebase Storage upload failed or timed out. Trying local server /api/upload fallback...",
      storageError
    );

    // Helper to read file as Base64 (needed for both server API and final Base64 fallback)
    const readFileAsBase64 = (): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            resolve(reader.result);
          } else {
            reject(new Error("Failed to read file as Base64"));
          }
        };
        reader.onerror = () => reject(new Error("File reading error"));
        reader.readAsDataURL(file);
      });
    };

    // 2. Try the local Express API /api/upload fallback
    try {
      const base64Data = await readFileAsBase64();
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer authorized_admin_session",
        },
        body: JSON.stringify({
          fileName,
          fileType,
          fileData: base64Data,
        }),
      });

      if (response.ok) {
        const resJson = await response.json();
        if (resJson.success && resJson.path) {
          console.log("Local server fallback upload successful:", resJson.path);
          return { url: resJson.path, sizeStr };
        }
      }
      throw new Error(`Server returned status ${response.status}`);
    } catch (serverError) {
      console.warn(
        "Local server fallback upload failed. Storing as Base64 directly in Firestore.",
        serverError
      );

      // 3. Ultimate Fallback: Return raw Base64 data URL so it is stored durably inside the Firestore document
      try {
        const base64Url = await readFileAsBase64();
        return { url: base64Url, sizeStr };
      } catch (base64Error) {
        console.error("All file upload strategies failed.", base64Error);
        throw new Error("Unable to upload file. All fallback strategies failed.");
      }
    }
  }
}
