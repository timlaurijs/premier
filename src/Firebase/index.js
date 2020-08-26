//This is an endpoint set up with Firebase to upload images and get a URL right back

import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBw7os02jecHU1DQ3ExGuxsZtEX9T7pisM",
  authDomain: "react-image-upload-f0fc2.firebaseapp.com",
  databaseURL: "https://react-image-upload-f0fc2.firebaseio.com",
  projectId: "react-image-upload-f0fc2",
  storageBucket: "react-image-upload-f0fc2.appspot.com",
  messagingSenderId: "315597664668",
  appId: "1:315597664668:web:3dbe1d217caee866675859",
  measurementId: "G-KMR01XD7KN",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
