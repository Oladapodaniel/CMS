import firebase from 'firebase'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    // apiKey: "AIzaSyBgHPpVv9qNKZvWUJh7CMVwLbF3uSZ0imo",
    // authDomain: "wisdominterconnect-c26e8.firebaseapp.com",
    // projectId: "wisdominterconnect-c26e8",
    // storageBucket: "wisdominterconnect-c26e8.appspot.com",
    // messagingSenderId: "196151770342",
    // appId: "1:196151770342:web:20dd11f2d46396a14c8f27",
    // measurementId: "G-7GH3NYHZBL"
    apiKey: "AIzaSyDunVAArr9w0AQYusn2FHxRbXe1crXhj-o",
    authDomain: "churchplus-web.firebaseapp.com",
    projectId: "churchplus-web",
    storageBucket: "churchplus-web.appspot.com",
    messagingSenderId: "921097979981",
    appId: "1:921097979981:web:69af9c8d4a04034ddbb404",
    measurementId: "G-CL18F882Z1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;