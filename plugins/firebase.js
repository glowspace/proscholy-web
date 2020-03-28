// /plugins/firebase.js
import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyC3jFunEGoCxoGdmp6wPfy8sJikU5Dxvwc",
    authDomain: "proscholycz.firebaseapp.com",
    databaseURL: "https://proscholycz.firebaseio.com",
    projectId: "proscholycz",
    storageBucket: "proscholycz.appspot.com",
    messagingSenderId: "1053312555544",
    appId: "1:1053312555544:web:dc55041abb9e3790f1c16d",
    measurementId: "G-862RGQNMEW"
};

let app = null
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig)
}


// export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
// export const auth = firebase.auth()
// export default firebase