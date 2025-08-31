import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getFirestore, doc, getDoc, setDoc, updateDoc, onSnapshot 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ⚠️ Firebase Config visible, pero seguro con reglas
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROJECT_ID.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_PROJECT_ID.appspot.com",
  messagingSenderId: "XXXXXXX",
  appId: "XXXXXXX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const countRef = doc(db, "status", "current");

// Estado de sesión local
let loggedIn = false;

// Elementos del DOM
const loginContainer = document.getElementById("login-container");
const appContainer = document.getElementById("app-container");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const logoutBtn = document.getElementById("logout-btn");
const checkinBtn = document.getElementById("checkin-btn");
const checkoutBtn = document.getElementById("checkout-btn");
const peopleCount = document.getElementById("people-count");
const statusLight = document.getElementById("status-light");
const statusText = document.getElementById("status-text");

// Mostrar estado siempre (sin login)
onSnapshot(countRef, snap => {
  if (snap.exists()) {
    const data = snap.data();
    peopleCount.textContent = data.people_count || 0;
    if (data.people_count === 0) {
      statusLight.className = "green";
      statusText.textContent = "Asociación vacía";
    } else {
      statusLight.className = "orange";
      statusText.textContent = "Asociación con gente";
    }
  } else {
    setDoc(countRef, { people_count: 0 });
  }
});

// Login de prueba
loginBtn.addEventListener("click", () => {
  if (passwordInput.value === "1234") {
    // Login "falso"
    loggedIn = true;
    loginContainer.classList.add("hidden");
    appContainer.classList.remove("hidden");
  } else {
    alert("Contraseña incorrecta");
  }
});

// Registro simulado
registerBtn.addEventListener("click", () => {
  alert("En modo demo no es necesario registrarse. Usa la contraseña 1234.");
});

// Logout
logoutBtn.addEventListener("click", () => {
  loggedIn = false;
  loginContainer.classList.remove("hidden");
  appContainer.classList.add("hidden");
});

// Entrar
checkinBtn.addEventListener("click", async () => {
  if (!loggedIn) return alert("Debes iniciar sesión");
  const snap = await getDoc(countRef);
  if (snap.exists()) {
    await updateDoc(countRef, {
      people_count: (snap.data().people_count || 0) + 1
    });
  }
});

// Salir
checkoutBtn.addEventListener("click", async () => {
  if (!loggedIn) return alert("Debes iniciar sesión");
  const snap = await getDoc(countRef);
  if (snap.exists()) {
    await updateDoc(countRef, {
      people_count: Math.max(0, (snap.data().people_count || 0) - 1)
    });
  }
});
