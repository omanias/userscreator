const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Ruta para mostrar el formulario de creación de usuario
router.get('/create', (req, res) => {
    res.render('createUser');
});

// Ruta para procesar el formulario y crear un nuevo usuario
router.post('/create', async (req, res) => {
    try {
        const { username, email } = req.body;
        const newUser = new User({ username, email });
        await newUser.save();
        res.send('Usuario creado con éxito.');
    } catch (error) {
        res.status(500).send('Error al crear el usuario.');
    }
});

module.exports = router;
