import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';

const env = (typeof import.meta !== 'undefined' && import.meta.env) || (typeof process !== 'undefined' && process.env) || {};

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || "AIzaSyA3zkBYJRUBl8LxyKWfE7Hyt_gDtCj7igg",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "noman-protfolio.firebaseapp.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "noman-protfolio",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "noman-protfolio.firebasestorage.app",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "939284272667",
  appId: env.VITE_FIREBASE_APP_ID || "1:939284272667:web:6c44dbb77987b129cecabe",
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || "G-556YSQE1FS"
};

// Initialize or reuse Firebase instance
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

const COLLECTION_NAME = 'portfolio_items';

/**
 * Real-time subscription to cloud portfolio items.
 * Calls callback(items, error) whenever cloud data updates.
 */
export function subscribeToPortfolio(onSuccess, onError) {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const q = query(colRef, orderBy('createdAt', 'desc'));

    return onSnapshot(
      q,
      (snapshot) => {
        const cloudItems = snapshot.docs.map((d) => ({
          ...d.data(),
          id: d.id,
          isCloud: true,
        }));
        onSuccess(cloudItems);
      },
      (error) => {
        console.warn('Firestore subscription fallback:', error.message);
        if (onError) onError(error);
      }
    );
  } catch (err) {
    console.warn('Failed to initialize Firestore listener:', err);
    if (onError) onError(err);
    return () => {};
  }
}

/**
 * Add a new video or graphic item to Firestore Cloud (with timeout guard)
 */
export async function addProjectToCloud(item, timeoutMs = 2500) {
  const colRef = collection(db, COLLECTION_NAME);
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Cloud Firestore connection timed out. Database may not be initialized in Firebase Console.')), timeoutMs)
  );

  const savePromise = addDoc(colRef, {
    ...item,
    createdAt: serverTimestamp(),
    publishedAt: new Date().toISOString(),
  });

  const docRef = await Promise.race([savePromise, timeoutPromise]);
  return docRef.id;
}

/**
 * Delete an item from Firestore Cloud (with timeout guard)
 */
export async function deleteProjectFromCloud(docId, timeoutMs = 2500) {
  const docRef = doc(db, COLLECTION_NAME, docId);
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Cloud Firestore connection timed out.')), timeoutMs)
  );

  await Promise.race([deleteDoc(docRef), timeoutPromise]);
  return true;
}


/**
 * Validate Admin Password
 */
export function verifyAdminPassword(password) {
  const configuredPassword = env.VITE_ADMIN_PASSWORD || 'noman@admin2026';
  return Boolean(password) && password.trim() === configuredPassword.trim();
}
