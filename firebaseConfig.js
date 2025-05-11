// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {initializeAuth, getReactNativePersistence} from "firebase/auth";

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import {getFirestore, collection} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAYcIU3dyUwsfgDeGL3Uh765pMyuNkolYg",
    authDomain: "mini-quiz-app-42116.firebaseapp.com",
    projectId: "mini-quiz-app-42116",
    storageBucket: "mini-quiz-app-42116.appspot.com",
    messagingSenderId: "149579394921",
    appId: "1:149579394921:web:bf4256dcc674a1937897f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const database = getFirestore(app);


export const quizQuestions = collection(database, "questions");
export const scores = collection(database, "scores");
