// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
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


document.getElementById('product').addEventListener('change', function () {
    calculateTotalPrice();
});

document.getElementById('quantity').addEventListener('input', function () {
    calculateTotalPrice();
});

function calculateTotalPrice() {
    var product = document.getElementById('product').value;
    var quantity = parseInt(document.getElementById('quantity').value);
    var pricePerUnit = getPricePerUnit(product);
    var totalPrice = pricePerUnit * quantity;
    document.getElementById('totalPrice').textContent = 'INR' + totalPrice.toFixed(2);
}

// Function to get price per unit based on selected product
function getPricePerUnit(product) {
    // You can implement logic to fetch price per unit from a database or use hardcoded values
    switch (product) {
        case 'Regular Plates':
            return 500.00;
        case 'Square Plates':
            return 1000.00;
        case 'Spoons and forks':
            return 200.00;
        case 'Partition Plates':
            return 1500.00;
        case 'Shallow Plates':
            return 1000.00;
        case 'Earthern Pot':
            return 250.00;
        case 'Clay Tea Cups':
            return 100.00;
        case 'Clay Water Pot':
            return 500.00;
        case 'Water Holder':
            return 400.00;
        case 'Mud Kadai':
            return 350.00;
        case 'Leaf Plates':
            return 300.00;
        case 'Leaf Partition Plate':
            return 500.00;
        case 'Plates & bowl':
            return 1500.00;
        case 'Bowl':
            return 300.00;
        case 'Paper Plates':
            return 800.00;
        default:
            return 0.00;
    }
}

// Calculate and display total price on page load
calculateTotalPrice();
const submit = document.getElementById('submit');
submit.addEventListener('click', (event) => {
    event.preventDefault();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            var product = document.getElementById('product').value;
            var quantity = parseInt(document.getElementById('quantity').value);
            var pricePerUnit = getPricePerUnit(product);
            var totalPrice = pricePerUnit * quantity;

            console.log(`${product} ${quantity} ${totalPrice}`)


            const db = getDatabase();
            const orderedItemsRef = ref(db, 'OrderedItems/' + user.uid + '/OrderedItem');
            // push(orderedItemsRef, {
            //     product: product,
            //     quantity: quantity,
            //     totalPrice: totalPrice
            // })
            set(orderedItemsRef, {
                product: product,
                quantity: quantity,
                price: totalPrice,
            }).then(() => {
                console.log("Successfully Saved");
            }).catch((error) => {
                console.error("Error saving data:", error);
            });
            // ...
        } else {
            // User is signed out
            // ...
        }
    });


    // Assuming you have already defined product, quantity, and totalPrice

});


