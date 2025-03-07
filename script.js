// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbv6uqRX-d3Yipq6rswsa5TXOl_LjMNjM",
  authDomain: "portfolio-10eb6.firebaseapp.com",
  databaseURL: "https://portfolio-10eb6-default-rtdb.firebaseio.com",
  projectId: "portfolio-10eb6",
  storageBucket: "portfolio-10eb6.firebasestorage.app",
  messagingSenderId: "509947205255",
  appId: "1:509947205255:web:0bc5f2337b43d065180a22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to detect device type
function getDeviceName() {
  const ua = navigator.userAgent;
  if (/mobile/i.test(ua)) return "Mobile";
  return "Desktop";
}

// Function to track visitor and save data to Firebase
function trackVisitor(ipData) {
  const statsRef = ref(database, 'visits');
  const visitData = {
    ip: ipData.ip,
    userAgent: navigator.userAgent,
    device: getDeviceName(),
    timestamp: new Date().toISOString()
  };
  
  push(statsRef, visitData)
    .then(() => console.log("Visitor stats saved successfully."))
    .catch((error) => console.error("Error saving visitor stats:", error));
}

// Fetch visitor's IP using ipify API
fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => trackVisitor(data))
  .catch(error => console.error("Failed to fetch IP address:", error));