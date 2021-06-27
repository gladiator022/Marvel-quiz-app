import app from "firebase/app";
import 'firebase/auth'

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
        app.initializeApp(this.Config)
        this.auth = app.auth();
    }

    SignUser = (email, password) =>{
        return this.auth.createUserWithEmailAndPassword(email, password);
    }

    LoginUser = (email, password) =>{
        return this.auth.signInWithEmailAndPassword(email, password);
    }
    LogoutUser = () =>{
        return this.auth.signOut();
    }
    
}

export default Firebase;
