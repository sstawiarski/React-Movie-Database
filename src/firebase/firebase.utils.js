import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAx6nMZPJqHX3P0HGdGPkx_BApHf6-Jchc",
    authDomain: "moviedb-df225.firebaseapp.com",
    databaseURL: "https://moviedb-df225.firebaseio.com",
    projectId: "moviedb-df225",
    storageBucket: "moviedb-df225.appspot.com",
    messagingSenderId: "543972840530",
    appId: "1:543972840530:web:ddc19604dca3480ced3b8b",
    measurementId: "G-P40Q8XCE2F"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;