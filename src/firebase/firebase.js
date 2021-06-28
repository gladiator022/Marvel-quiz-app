import firebase from "firebase";
import 'firebase/auth'
import 'firebase//firestore'

class Firebase  {

  // Your web app's Firebase configuration
   Config = {

    apiKey: "AIzaSyAO_sEPOFO89M_yVkvercTluXz-TdCmZBw",
    authDomain: "marvel-app-d177c.firebaseapp.com",
    projectId: "marvel-app-d177c",
    storageBucket: "marvel-app-d177c.appspot.com",
    messagingSenderId: "413230072703",
    appId: "1:413230072703:web:4aa0f2348495aa51b7104a"
  };
  // Initialize Firebase


    constructor() {
        firebase.initializeApp(this.Config)
        this.auth = firebase.auth();
        this.db = firebase.firestore()
    }

    SignUser = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

    LoginUser = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

    LogoutUser = () => this.auth.signOut();

    user = uid => this.db.doc(`users/${uid}`)
    
}

export default Firebase;
