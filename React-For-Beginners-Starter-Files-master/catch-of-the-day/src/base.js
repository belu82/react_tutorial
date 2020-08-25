import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD3KfEZpA2NLS51UaURFU5apbEP2ACDoXY",
    authDomain: "catch-of-the-day-6e827.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-6e827.firebaseio.com"
  });

  const base = Rebase.createClass(firebaseApp.database());

  //export 

  export {firebaseApp};

  export default base;