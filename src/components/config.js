import * as firebase from "firebase/app";
import * as firestore from 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyBZWci0O-tUABy-jVcWZ1-qxnYUtUm3SBw",
  authDomain: "munzidiary.firebaseapp.com",
  databaseURL: "https://munzidiary.firebaseio.com",
  projectId: "munzidiary",
  storageBucket: "munzidiary.appspot.com",
  messagingSenderId: "832856698052",
  appId: "1:832856698052:web:b6e9633433645c97"
};
firebase.initializeApp(firebaseConfig);
// Initialize Firebase
firebase.firestore();

const db = firebase.firestore();

export default db;


