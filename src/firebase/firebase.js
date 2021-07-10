import firebase from "firebase";
import 'firebase/auth'
import 'firebase//firestore'

class Firebase  {

  // Your web app's Firebase configuration
   Config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId:process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID  
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
