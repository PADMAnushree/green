// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase,ref,set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

import { getAuth,createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebaseauth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBseO1ACT2nkXVAGz6ie2Xp2VsaHPvPGHE",
  authDomain: "greengroove-1c7bb.firebaseapp.com",
  projectId: "greengroove-1c7bb",
  storageBucket: "greengroove-1c7bb.appspot.com",
  messagingSenderId: "1098071047805",
  appId: "1:1098071047805:web:58fd9e6db9ce7eddb63b14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);


const name=document.getElementById("name").value
const email=document.getElementById("email").value
const password=document.getElementById("password").value



createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    console.log("Signed UP")
    var user = userCredential.user;
    const userId = auth.currentUser.uid;
    writeUserData(userId,name,email,password)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

  function writeUserData(userId, name, email,password) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      username: name,
      email: email,
      name : name,
      password:password
    });
  }

  const button=document.getElementById("btn")
  button.addEventListener("click",createUserWithEmailAndPassword(auth,email,password))



  
