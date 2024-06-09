const express = require('express');
const bodyParser = require('body-parser');
const { db } = require('./firebase');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Example route to get data from Firestore
app.get('/get-list', async (req, res) => {
  try {
    const snapshot = await db.collection('menu').get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Example route to add data to Firestore
app.post('/menu-add', async (req, res) => {
  try {
    const data = req.body;
    const docRef = await db.collection('menu').add(data);
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
