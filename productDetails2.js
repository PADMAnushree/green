import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyBseO1ACT2nkXVAGz6ie2Xp2VsaHPvPGHE",
    authDomain: "greengroove-1c7bb.firebaseapp.com",
    databaseURL: "https://greengroove-1c7bb-default-rtdb.firebaseio.com",
    projectId: "greengroove-1c7bb",
    storageBucket: "greengroove-1c7bb.appspot.com",
    messagingSenderId: "1098071047805",
    appId: "1:1098071047805:web:58fd9e6db9ce7eddb63b14"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
    if (user) {
        const navDiv = document.getElementById('anchorContain');

        const links = [
            { text: 'Home', href: 'index.html', id: '' },
            { text: 'Products', href: 'product.html', id: '' },
            { text: 'About', href: 'aboutUs.html', id: '' },
            { text: 'Order', href: 'orderForm.html', id: '' }
        ];

        links.forEach(link => {
            const anchor = document.createElement('a');
            anchor.textContent = link.text;
            anchor.href = link.href;
            anchor.id = link.id;
            console.log(link.text == 'Products')
            if (link.text == 'Products') { anchor.className = 'underline navigate' }
            else anchor.className = 'navigate';

            navDiv.appendChild(anchor);
        });

    } else {

        const navDiv = document.getElementById('anchorContain');

        const links = [
            { text: 'Home', href: 'index.html' },
            { text: 'Products', href: 'product.html', id: '' },
            { text: 'Sign In', href: 'login.html' },
            { text: 'Sign Up', href: 'signUp.html' }
        ];

        links.forEach(link => {
            const anchor = document.createElement('a');
            anchor.textContent = link.text;
            anchor.href = link.href;
            if (link.text == 'Products') { anchor.className = 'underline navigate' }
            else anchor.className = 'navigate';
            navDiv.appendChild(anchor);
        });

    }
});