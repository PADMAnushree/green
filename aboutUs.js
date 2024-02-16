import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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
const dbRef = ref(getDatabase());

onAuthStateChanged(auth, (user) => {
    if (user) {
        var userId = user.uid;
        get(child(dbRef, `users/${userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                const uname = document.getElementById('uname')
                uname.innerText = `Name : ${snapshot.val().name}`
                const uemail = document.getElementById('uemail')
                uemail.innerText = `Email : ${snapshot.val().email}`
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
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
            if (link.text == 'About') { anchor.className = 'underline navigate' }
            else anchor.className = 'navigate';

            navDiv.appendChild(anchor);
        })


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
            if (link.text == 'About') { anchor.className = 'underline navigate' }
            else anchor.className = 'navigate';
            navDiv.appendChild(anchor);
        });

    }
});
onAuthStateChanged(auth, (user) => {
    if (user) {
        var userId = user.uid;
        get(child(dbRef, `OrderedItems/${userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                var orderedItemsDiv = document.getElementById('orderedItems');
                console.log(orderedItemsDiv)

                const data = snapshot.val();
                console.log(data)


                if (data) {
                    Object.values(data).forEach(order => {
                        var productName = order.product;
                        var price = order.price;
                        var quantity = order.quantity;

                        var itemDiv = document.createElement('div');
                        itemDiv.className = "item"
                        itemDiv.innerHTML = `<img src="images/Partition Plates.png" class="image" alt="Product 1">
                            <div class="item-info">
                                <p>Product Name: ${productName}</p>
                                <p>Price: ${price}</p>
                                <p>Quantity:${quantity}</p>
                            </div>`

                        orderedItemsDiv.appendChild(itemDiv);
                    });
                } else {
                    console.log("No data available1");
                }
            } else {
                var orderedItemsDiv = document.getElementById('orderedItems');
                orderedItemsDiv.innerHTML = `<h2>Ordered Items</h2>
                    <div class="item" >
                        <p>No Orders Yet</p>
                    </div>`

            }
        }).catch(error => {
            console.error("Error getting data:", error);
        });
    }
});
const logout = document.getElementById('logout')
logout.addEventListener("click", () => {
    auth.signOut()
    const a = document.createElement('a')
    a.href = "index.html"
    a.click()
})