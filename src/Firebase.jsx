import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  serverTimestamp,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const API_KEY = import.meta.env.VITE_SOME_KEY;


const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "member-portal-8a367.firebaseapp.com",
  projectId: "member-portal-8a367",
  storageBucket: "member-portal-8a367.appspot.com",
  messagingSenderId: "389153166875",
  appId: "1:389153166875:web:a2cde7e4ae132942d74abe",
  measurementId: "G-4ZCLBGQ773",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

async function sendMessage(
  user,
  address,
  name,
  email,
  phone,
  vacancy,
  availability
) {
  try {
    const docId = user.uid; // Use the User UID as the document ID
    const docRef = doc(db, "properties", docId); // Create a document reference with the specified ID
    await setDoc(docRef, {
      uid: user.uid,
      address: address,
      name: name,
      email: email,
      phone: phone,
      vacancy: vacancy ? "Yes" : "No",
      availability: availability,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
}

async function updateMessage(
  user,
  address,
  name,
  email,
  phone,
  vacancy,
  availability
) {
  try {
    const docId = user.uid;
    const docRef = await getDoc(doc(db, "properties", docId));

    if (docRef.exists()) {
      await updateDoc(docRef, {
        uid: user.uid,
        address: address,
        name: name,
        email: email,
        phone: phone,
        vacancy: vacancy ? "Yes" : "No",
        availability: availability,
      });
    }
  } catch (error) {
    console.error(error);
  }
}

function getMessages(callback) {
  return onSnapshot(collection(db, "properties"), (querySnapshot) => {
    const messages = querySnapshot.docs.map((x) => ({
      id: x.id,
      ...x.data(),
    }));

    if (typeof callback === "function") {
      callback(messages);
    }
  });
}

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  sendMessage,
  getMessages,
  updateMessage,
  storage
};