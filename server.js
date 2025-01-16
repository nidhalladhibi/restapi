// server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRouter = require('./routes/userrouter');


const app = express();
const PORT = process.env.PORT 
const MONGODB_URI = process.env.MONGODB_URI

//middleware
app.use(express.json()); //parse json data
app.use(express.static('public')); //serve static files

// Connexion à MongoDB
mongoose.connect(MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));
// Routes
app.use('/api/users', userRouter);

 // Démarrage du serveur
app.listen(PORT, (err) => {
    if (err) {
      console.error('❌ Error starting server:', err);
    } else {
      console.log(`✅ Server is running at http://localhost:${PORT}`);
    }
  });
  console.log('User routes mounted on /api/users');
