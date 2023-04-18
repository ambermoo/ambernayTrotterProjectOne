
  // Import the functions you need from the SDKs you need
    import {initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBDOqW2nUaXVxufRr2h5KHNgIUDU3_b0l4",
    authDomain: "cool-store-7ac0e.firebaseapp.com",
    databaseURL: "https://cool-store-7ac0e-default-rtdb.firebaseio.com",
    projectId: "cool-store-7ac0e",
    storageBucket: "cool-store-7ac0e.appspot.com",
    messagingSenderId: "260714945679",
    appId: "1:260714945679:web:0430c3879a426c8d1864fa"
  };

    // Initialize Firebase
    const firebaseInfo = initializeApp(firebaseConfig);

    export default firebaseInfo;