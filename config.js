import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAGV41OxRgSNZ2spFfoz_BlU5wxLfgp9K0",
  authDomain: "fir-a2abe.firebaseapp.com",
  projectId: "fir-a2abe",
  storageBucket: "fir-a2abe.appspot.com",
  messagingSenderId: "304780278469",
  appId: "1:304780278469:web:8b2be5268ae637dcab4eac",
  measurementId: "G-WY3N9JX8MR"
}


if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}


export {firebase}