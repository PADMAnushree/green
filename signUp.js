// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
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
const database = getDatabase(app);

const submitBtn = document.getElementById('btn');

submitBtn.addEventListener('click', function (event) {
  event.preventDefault(); // Prevent form submission

  createAccount();
});


function createAccount() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const name = document.getElementById('name').value;


  // Create account using Firebase Authentication
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("User Created")


      // Store email, name, and password in Firebase Realtime Database
      set(ref(database, 'users/' + user.uid), {
        email: email,
        name: name,
        password: password,
      });
      console.log("User Created   ...")
      //window.location.href = 'index.html';
      const anchor = document.createElement('a')
      anchor.href = 'index.html'
      anchor.target = '_blank'
      anchor.click()



    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage + errorCode);
    });
}
