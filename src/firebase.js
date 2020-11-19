import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDsO9SG8kjLZJ0NdmkJD1TBpSmA_eReOv4",
    authDomain: "slack-89146.firebaseapp.com",
    databaseURL: "https://slack-89146.firebaseio.com",
    projectId: "slack-89146",
    storageBucket: "slack-89146.appspot.com",
    messagingSenderId: "114753927032",
    appId: "1:114753927032:web:2bf4f0b9d8e14d0d1bba8d",
    measurementId: "G-4KEDPF0WK3"
  };

const firebaseapp = firebase.initializeApp(firebaseConfig);
const db = firebaseapp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
export { auth, provider ,timeStamp}

export default db;