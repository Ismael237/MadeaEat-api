import { initializeApp as iA} from "firebase/app";
import { cert } from "firebase-admin/app";
import * as admin from 'firebase-admin';

const serviceAccount = require("../../madea-eat-plateforme-firebase-adminsdk-8fqi2-ff516c0dbb.json");

const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.API_KEY,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.API_ID,
    measurementId: process.env.MEASUREMENT_ID
};

const app = iA(config);

admin.initializeApp({
    credential: cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { app, db };