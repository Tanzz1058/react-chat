import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyCR824pKitjD5gLYwMdMGKn34I0hkXrxyw",
  authDomain: "todolist-b4294.firebaseapp.com",
  databaseURL: "https://todolist-b4294.firebaseio.com",
  projectId: "todolist-b4294",
  storageBucket: "todolist-b4294.appspot.com",
  messagingSenderId: "482152796693",
  appId: "1:482152796693:web:2dcd51d9faf241267a341c",
  measurementId: "G-EV84D4GRC0",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
