const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyADIr5Gmro93UFyew8PCL3ooWQUtXSTsDg",
    authDomain: "chatapp-75d77.firebaseapp.com",
    databaseURL: "https://chatapp-75d77-default-rtdb.firebaseio.com",
    projectId: "chatapp-75d77",
    storageBucket: "chatapp-75d77.appspot.com",
    messagingSenderId: "242251383054",
    appId: "1:242251383054:web:ec95ac5037f4b86ce9d75f",
    measurementId: "G-P5272MCGW1"
  };


firebase.initializeApp(firebaseConfig); //initialize firebase app 
module.exports = { firebase }; //export the app