// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
export const auth = getAuth(); //keep tracks of all auth related stuff
const db = getFirestore(firebaseApp);

// optional
provider.setCustomParameters({
  prompt: "select_account",
});

// sign in with google, you can add any providers

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// user auth is coming from signin
export const createUserDocumentFromAuth = async (
  userAuth: any,
  additionalInformation = {}
) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  // check if exists

  const userSnapshot = await getDoc(userDocRef); // returns bool

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (e: any) {
      console.log("error while creating the user", e.message);
    }
  }

  return userDocRef;
};

export const createUserWithCredentials = async (
  email: string,
  password: string
) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmail = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: any) =>
  onAuthStateChanged(auth, callback);

// write to the db

export const persistVideoHistory = async (
  userAuth: any,
  additionalInformation = {
    name: "testttttt",
    age: 24,
  }
) => {
  try {
    await addDoc(collection(db, "history"), {
      ...additionalInformation,
      user: "DvFkZ3nlPpWNsr4RDH8jYOGlfwK2", // Add the user UUID as a reference
    });

    console.log("Code was here-----");
  } catch (error: any) {
    console.log("Something went wrong:", error.message);
  }
};

export const updateUserHistory = async (userId: any, title: any, id: any) => {
  try {
    const userRef = doc(db, "history", userId);

    // Get the user document
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      // Retrieve the existing user data
      const userData = userDoc.data();

      // Check if the title already exists in the user's history
      const existingItem = userData.history.find(
        (item: any) => item.title === title
      );

      if (existingItem) {
        // If the title already exists, update the corresponding item
        existingItem.id = id;
      } else {
        // If the title is unique, append a new history item
        userData.history.push({ title, id });
      }

      // Update the user document with the modified data
      await setDoc(userRef, userData);
      console.log("User history updated successfully.");
    } else {
      throw new Error("User document not found.");
    }
  } catch (error) {
    console.error("Error updating user history:", error);
  }
};
