// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAMSbtJVTAJe6EeQnjLqQpTEbPsK6JlSKo',
  authDomain: 'imagetakerii.firebaseapp.com',
  projectId: 'imagetakerii',
  storageBucket: 'imagetakerii.appspot.com',
  messagingSenderId: '487564684934',
  appId: '1:487564684934:web:47384fd2f3ff7b4fe12b07',
  measurementId: 'G-XW6WRBB9JT',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
