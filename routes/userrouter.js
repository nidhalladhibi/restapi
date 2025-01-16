const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Exemple de route POST
router.post('/newuser', (req, res) => {
  console.log(req.body);
  
    const { name, email, age } = req.body;
  
    // Vérification des champs obligatoires
    if (!name || !email || !age) {
      return res.status(400).json({ message: "Name, email, and age are required" });
    }
    console.log('User created');
  
    const newUser = new User({ name, email, age });
    newUser
      .save()
      .then(() => res.status(201).json(newUser))
      .catch((err) => res.status(500).json(err));
  });
  // GET -> /api/users/
router.get('/', (req, res) => {
    User.find()
      .then((users) => res.status(200).json(users))
      .catch((err) => res.status(500).json(err));
  }); 
  // Route PUT: Mettre à jour un utilisateur par ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  // Vérification des champs obligatoires
  if (!name && !email && !age) {
    return res.status(400).json({ message: "At least one field is required to update" });
  }

  User.findByIdAndUpdate(
    id,
    { name, email, age },
    { new: true, runValidators: true } // Retourne l'objet mis à jour
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(updatedUser);
    })
    .catch((err) => res.status(500).json({ message: "Error updating user", error: err }));
});
// Route DELETE: Supprimer un utilisateur par ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  User.findByIdAndDelete(id)
    .then((deletedUser) => {
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully", deletedUser });
    })
    .catch((err) => res.status(500).json({ message: "Error deleting user", error: err }));
});
  

module.exports = router;

