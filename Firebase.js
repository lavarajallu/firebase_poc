import firebase from 'react-native-firebase';

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyAA18uLtsl_VXXQm2BOuFzV2fx0ien_Wpc",
  authDomain: "poccrud.firebaseapp.com",
  databaseURL: "https://poccrud.firebaseio.com",
  projectId: "poccrud",
  storageBucket: "poccrud.appspot.com",
  messagingSenderId: "637225351013",
  appId: "1:637225351013:web:9739828d82c4d39185138c",
  measurementId: "G-MMS2JLQS64"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
firebase.firestore().settings(settings);

export default firebase;

