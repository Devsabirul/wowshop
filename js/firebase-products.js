import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2xtZZ9viQOxjmnYpzQhtjYne5l82FM3Y",
  authDomain: "bluedreamitaly.firebaseapp.com",
  projectId: "bluedreamitaly",
  storageBucket: "bluedreamitaly.firebasestorage.app",
  messagingSenderId: "145879085917",
  appId: "1:145879085917:web:938008da8d22839f7c6eb4",
  measurementId: "G-NX6V7GXSS1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Select Product Grid
const productGrid = document.querySelector(".product-grid");
const bestSelling = document.querySelector(".owl-carousel");

// Load Products
async function loadProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    productGrid.innerHTML = ""; // Clear the static content

    querySnapshot.forEach((doc) => {
      const product = doc.data();
      const productHTML = `
        <div class="product-item ${product.category}">
          <div class="product">
            <div class="product_image">
              <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product_info">
              <h6 class="product_name">
                <a href="single.html?id=${doc.id}">${product.name}</a>
              </h6>
              <div class="product_price">$${product.price}</div>
            </div>
          </div>
        </div>
      `;
      productGrid.innerHTML += productHTML;
    });
  } catch (error) {
    console.error("Error loading products:", error);
  }
}
// besgt Products
async function loadBestSellingProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    bestSelling.innerHTML = ""; // Clear the static content

    querySnapshot.forEach((doc) => {
      const product = doc.data();
      const productHTML = `
        <div class="product-item">
          <div class="product">
            <div class="product_image">
              <img src="${product.image}" alt="${product.name}" />
            </div>
            <div class="favorite favorite_left"></div>
            <div
              class="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center"
            >
              <span>NEW</span>
            </div>
            <div class="product_info">
              <h6 class="product_name">
                <a href="single.html?id=${doc.id}">${product.name}</a>
              </h6>
              <div class="product_price">
                €${product.price} <span>€${parseFloat(product.price) + 5}</span>
              </div>
            </div>
          </div>
          <div class="red_button add_to_cart_button">
            <a href="https://wa.me/393896025905?text=Hello, I want to order this product: ${product.name}, Price:  €${product.price}, Link: https://wowvaiya.shop/single.html?id=${doc.id}">Order Now</a>
          </div>
        </div>
      `;
      bestSelling.innerHTML += productHTML;
    });
  } catch (error) {
    console.error("Error loading best selling products:", error);
  }
}

// Load products when page loads
document.addEventListener("DOMContentLoaded", loadProducts);
document.addEventListener("DOMContentLoaded", loadBestSellingProducts);
