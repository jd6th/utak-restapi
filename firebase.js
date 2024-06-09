const admin = require('firebase-admin');
const serviceAccount = require('./firebaseServiceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://menu-utak-50347.firebaseio.com'
});

const db = admin.firestore();
module.exports = { admin, db };
