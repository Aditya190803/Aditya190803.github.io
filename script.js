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
  return /mobile/i.test(ua) ? "Mobile" : "Desktop";
}

// Function to track visitor
function trackVisitor(ipData) {
  const ip = ipData.ip;
  const statsRef = ref(database, `visits/${ip}`); // Use IP as the unique key

  get(statsRef).then((snapshot) => {
    if (snapshot.exists()) {
      // If IP already exists, update visit count
      const visitData = snapshot.val();
      console.log(`Existing visitor found: ${ip} - Previous visits: ${visitData.visits}`);

      update(statsRef, {
        visits: visitData.visits + 1,
        lastVisited: new Date().toISOString()
      }).then(() => console.log(`Updated visit count for ${ip}`));
    } else {
      // New IP, add a new record
      set(statsRef, {
        ip: ip,
        userAgent: navigator.userAgent,
        device: getDeviceName(),
        visits: 1, // First visit
        firstVisited: new Date().toISOString(),
        lastVisited: new Date().toISOString()
      }).then(() => console.log(`New visitor logged: ${ip}`));
    }
  }).catch((error) => console.error("Error checking IP:", error));
}

// Fetch visitor's IP using ipify API
fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => trackVisitor(data))
  .catch(error => console.error("Failed to fetch IP address:", error));
