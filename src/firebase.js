import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1FAgNQhJFpnkCbIIFwOaugyhYzL5bUE8",
  authDomain: "slack-e2dd9.firebaseapp.com",
  databaseURL: "https://slack-e2dd9.firebaseio.com",
  projectId: "slack-e2dd9",
  storageBucket: "slack-e2dd9.appspot.com",
  messagingSenderId: "703612283976",
  appId: "1:703612283976:web:ac388de2e24b4b5ac6bc7d",
  measurementId: "G-YYMMED8PCJ"
};

const firebaseapp = firebase.initializeApp(firebaseConfig);
const db = firebaseapp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
export { auth, provider ,timeStamp}

export default db;