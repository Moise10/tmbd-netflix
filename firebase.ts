// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyD8rdZ26kPCwx7kxjA0Ow_GINKfEov3obU',
	authDomain: 'tmdb-netflix-clone.firebaseapp.com',
	projectId: 'tmdb-netflix-clone',
	storageBucket: 'tmdb-netflix-clone.appspot.com',
	messagingSenderId: '848912102863',
	appId: '1:848912102863:web:50535f4b861c8e32728eba',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
