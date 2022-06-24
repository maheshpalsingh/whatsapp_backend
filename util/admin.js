
var admin = require("firebase-admin");

var serviceAccount = require("../chatapp-75d77-firebase-adminsdk-jryq6-707b61c610.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chatapp-75d77-default-rtdb.firebaseio.com"
});


const db = admin.firestore();
module.exports = { admin, db };