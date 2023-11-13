const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/express-user-app';

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Conectar a la base de datos MongoDB
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectado a la base de datos MongoDB');
    })
    .catch((error) => {
        console.error('Error de conexión a la base de datos:', error.message);
    });

// Rutas de usuario
app.use('/users', userRoutes);

// Ruta de prueba para generar usuarios (puedes eliminarla en producción)
app.get('/test', async (req, res) => {
    const testUser = new User({ username: 'testuser', email: 'test@example.com' });
    await testUser.save();
    res.send('Usuario de prueba creado.');
});

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
