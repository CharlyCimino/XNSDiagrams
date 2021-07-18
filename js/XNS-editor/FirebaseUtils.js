  var firebaseConfig = {
    apiKey: "AIzaSyDGbBrjpS5ksVKPbjgemTRRo5cdHR70Q38",
    authDomain: "nsplus-23b8f.firebaseapp.com",
    projectId: "nsplus-23b8f",
    storageBucket: "nsplus-23b8f.appspot.com",
    messagingSenderId: "313083129617",
    appId: "1:313083129617:web:4ebbc88af18aa69bd626b0",
    measurementId: "G-F0PF2P50G1"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var fbase = firebase.firestore();
var valid_users = [];
var loadValidUsers = (result) => { try { valid_users = result.data(); } catch(e) {}};
fbase.collection("nsp-teacher").doc("gxQ27COFmtjsts8JBYq4").get().then(loadValidUsers);