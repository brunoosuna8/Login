import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyC0H0rD8SaamVetBXbngaOGi8b0kVm_PDQ",
  authDomain: "sagaz-53101.firebaseapp.com",
  projectId: "sagaz-53101",
  storageBucket: "sagaz-53101.appspot.com",
  messagingSenderId: "843708448609",
  appId: "1:843708448609:web:06888f5bee4a41f0c94f20",
  measurementId: "G-EBF3QDXD08",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;
