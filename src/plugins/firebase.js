//firebase.js
import Vue from "vue";
import firebase from "firebase/app";
import "firebase/firebase-messaging";

const firebaseConfig = {
  apiKey: "AIzaSyA1Qhu0dnmDepSs_-nUKSpGBIX42H00DKI",
  authDomain: "akry-2653b.firebaseapp.com",
  projectId: "akry-2653b",
  storageBucket: "akry-2653b.appspot.com",
  messagingSenderId: "35605685091",
  appId: "1:35605685091:web:ca117d8fa3feff6fef2956",
  measurementId: "G-YM05RMWG2B",
};

firebase.initializeApp(firebaseConfig);

// navigator.serviceWorker
//   .register("firebase-messaging-sw.js", {
//     scope: "firebase-cloud-messaging-push-scope",
//   })
//   .then((registration) => {
//     const messaging = firebase.messaging();
//     messaging.useServiceWorker(registration);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

export default firebase.messaging();
