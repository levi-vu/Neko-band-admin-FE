import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyCr27sdCgbdr8VN-dR_xrAfVk9sj-nToac",
	authDomain: "hand-mad.firebaseapp.com",
	projectId: "hand-mad",
	storageBucket: "hand-mad.appspot.com",
	messagingSenderId: "981199374001",
	appId: "1:981199374001:web:622dd55bbceec176724490",
	measurementId: "G-V5V1396W16",
};

const firebaseDevConfig = {
	apiKey: "AIzaSyBXIlvO70VFbyWE04yhYF0HIMGTSfoUtNE",
	authDomain: "hand-mad-dev.firebaseapp.com",
	projectId: "hand-mad-dev",
	storageBucket: "hand-mad-dev.appspot.com",
	messagingSenderId: "217099085635",
	appId: "1:217099085635:web:bfb4bdd4f64e57e36731f6",
	measurementId: "G-7GTV2PY4NT",
};

const app = initializeApp(!process.env.NODE_ENV || process.env.NODE_ENV === "development" ? firebaseDevConfig : firebaseConfig);
const storage = getStorage(app);

export default storage;
