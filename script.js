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
// Function to detect device type
function getDeviceName() {
  const ua = navigator.userAgent;
  return /mobile/i.test(ua) ? "Mobile" : "Desktop";
}

// Function to track visitor
function trackVisitor(ip) {
  const statsRef = ref(database, `visits/${ip}`); // Use IP as the key

  get(statsRef).then((snapshot) => {
    if (snapshot.exists()) {
      // If IP exists, increment visit count
      const visitData = snapshot.val();
      update(statsRef, {
        visits: (visitData.visits || 0) + 1,  // Increment visit count
        lastVisited: new Date().toISOString()
      })
      .then(() => console.log(`Updated visit count for ${ip}`))
      .catch((error) => console.error("Error updating visit count:", error));
    } else {
      // If IP is new, create a new entry
      set(statsRef, {
        ip: ip,
        userAgent: navigator.userAgent,
        device: getDeviceName(),
        visits: 1, // First visit
        firstVisited: new Date().toISOString(),
        lastVisited: new Date().toISOString()
      })
      .then(() => console.log(`Stored new visitor: ${ip}`))
      .catch((error) => console.error("Error storing visitor:", error));
    }
  }).catch((error) => console.error("Error checking existing IP:", error));
}

// Fetch visitor's IP address using ipify API
fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    trackVisitor(data.ip);
  })
  .catch(error => console.error("Failed to fetch IP address:", error));
