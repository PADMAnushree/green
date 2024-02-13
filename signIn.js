// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBseO1ACT2nkXVAGz6ie2Xp2VsaHPvPGHE",
    authDomain: "greengroove-1c7bb.firebaseapp.com",
    databaseURL: "https://greengroove-1c7bb-default-rtdb.firebaseio.com",
    projectId: "greengroove-1c7bb",
    storageBucket: "greengroove-1c7bb.appspot.com",
    messagingSenderId: "1098071047805",
    appId: "1:1098071047805:web:58fd9e6db9ce7eddb63b14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const btn = document.getElementById("btn")
btn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const anchor = document.createElement('a')
            anchor.href = 'index.html'
            anchor.target = '_blank'
            anchor.click()

            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        });

})

