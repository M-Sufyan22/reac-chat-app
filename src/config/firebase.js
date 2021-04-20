import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyBLZQEM5WCHduxO2nCq-fixCdNY5mPTFhY",
    authDomain: "chatapp--reactjs.firebaseapp.com",
    databaseURL: "https://chatapp--reactjs.firebaseio.com",
    projectId: "chatapp--reactjs",
    storageBucket: "chatapp--reactjs.appspot.com",
    messagingSenderId: "269907888579",
    appId: "1:269907888579:web:e25ac2b8becc94d9b51576",
    measurementId: "G-ELRL3QJ7TG"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

export default firebase;