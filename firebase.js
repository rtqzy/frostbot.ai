// Import from Firebase CDN (since we're not using npm bundler)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyASei9dKyRPz-USwVXAucdC8F1iPZLqYE0",
  authDomain: "frostbot-ff6c4.firebaseapp.com",
  projectId: "frostbot-ff6c4",
  storageBucket: "frostbot-ff6c4.appspot.com",
  messagingSenderId: "704743212531",
  appId: "1:704743212531:web:e321d923bf8ff510817e86",
  measurementId: "G-T0FF2DMZ2M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle login form
if (window.location.pathname.includes("login.html")) {
  const loginForm = document.getElementById("loginForm");
  const errorBox = document.getElementById("error");

  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm.username.value;
    const password = loginForm.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        localStorage.setItem("frostbotUser", email);
        window.location.href = "index.html";
      })
      .catch((error) => {
        errorBox.textContent = "Invalid login. Please try again.";
        console.error(error.message);
      });
  });
}

// Handle register form
if (window.location.pathname.includes("register.html")) {
  const registerForm = document.getElementById("registerForm");
  const errorBox = document.getElementById("error");

  registerForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = registerForm.username.value;
    const password = registerForm.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        localStorage.setItem("frostbotUser", email);
        window.location.href = "index.html";
      })
      .catch((error) => {
        errorBox.textContent = "Registration failed. Try again.";
        console.error(error.message);
      });
  });
}

// Auto-check auth state on index
if (window.location.pathname.includes("index.html")) {
  onAuthStateChanged(auth, (user) => {
    const loginBtn = document.querySelector(".login-button");
    if (user) {
      loginBtn?.remove(); // Hide login if logged in
    }
  });
}
