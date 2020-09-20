import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBLFHlcY_CYn1ai5aWZibHHfhkc8rqmzl",
  authDomain: "budget-d7b9b.firebaseapp.com",
  databaseURL: "https://budget-d7b9b.firebaseio.com",
  projectId: "budget-d7b9b",
  storageBucket: "budget-d7b9b.appspot.com",
  messagingSenderId: "546583732408",
  appId: "1:546583732408:web:da3e3101f16f8c59f2144d",
  measurementId: "G-N552GGESLB",
};

firebase.initializeApp(config);

export default firebase;
