// import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore';

import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyB8JH93gCF9AnHN_X4CuTGYw3nhpe-1XBs",
  authDomain: "als-mnh.firebaseapp.com",
  databaseURL: "https://als-mnh.firebaseio.com",
  projectId: "als-mnh",
  storageBucket: "als-mnh.appspot.com",
  messagingSenderId: "260160216073",
  appId: "1:260160216073:web:c65cff3bddb8d28d5b6cd8",
  measurementId: "G-CBHCYEJ26G"
};


firebase.initializeApp(firebaseConfig);
// export const firebaseDatabase = firebase.database();
export const firebaseStorage = firebase.storage();
export const firebaseAuth = firebase.auth();
export const db = firebase.firestore();

