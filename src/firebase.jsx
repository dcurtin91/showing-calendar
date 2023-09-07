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
  getDocs,
  query,
  where
} from "firebase/firestore";

//const API_KEY = import.meta.env.VITE_SOME_KEY;


const firebaseConfig = {
  apiKey: "AIzaSyAUvc1RyHIQNW-wID9H4Hr6zs6Y4LyG0fk",
  authDomain: "showing-calendar-a72be.firebaseapp.com",
  projectId: "showing-calendar-a72be",
  storageBucket: "showing-calendar-a72be.appspot.com",
  messagingSenderId: "244957298445",
  appId: "1:244957298445:web:5caffd41522efdb771fa44",
  measurementId: "G-ZJ5LS3D5KL"
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
  phone
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
  phone
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
        phone: phone
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

async function addIt(uid, activity) {
  try {
    const collectionRef = collection(db, "properties", uid, "events");
    await addDoc(collectionRef, {
      activity: activity,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
}



const editIt = async (activity, activityKey) => {
  try {
    const docRef = doc(db, "properties", uid, "events", activityKey);
    await updateDoc(docRef, {
      name: activity.name,
      type: activity.type,
      date: activity.date,
      time: activity.time,
    });
  } catch (error) {
    console.error(error);
  }
};


async function fetchActivities(uid, queryDate) {
  try {
    const collectionRef = collection(db, "properties", uid, "events");
    const querySnapshot = await getDocs(
      query(collectionRef, where("date", "==", queryDate))
    );

    const activities = [];
    querySnapshot.forEach((doc) => {
      activities.push(doc.data());
    });

    return activities;
  } catch (error) {
    console.error(error);
    return [];
  }
  
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
  storage,
  addIt,
  editIt,
  fetchActivities
};