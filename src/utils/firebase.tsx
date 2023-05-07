
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCr27sdCgbdr8VN-dR_xrAfVk9sj-nToac",
  authDomain: "hand-mad.firebaseapp.com",
  projectId: "hand-mad",
  storageBucket: "hand-mad.appspot.com",
  messagingSenderId: "981199374001",
  appId: "1:981199374001:web:622dd55bbceec176724490",
  measurementId: "G-V5V1396W16"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default  storage;