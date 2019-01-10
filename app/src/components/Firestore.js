import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDclClUVNbMLVTPhQ5yOB3kuvsznRo-o1A",
  authDomain: "epiphron-a7a8a.firebaseapp.com",
  databaseURL: "https://epiphron-a7a8a.firebaseio.com",
  projectId: "epiphron-a7a8a",
  storageBucket: "",
  messagingSenderId: "1071189903483"
};
firebase.initializeApp(config);

export default firebase;