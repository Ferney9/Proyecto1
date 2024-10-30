const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Pet = require('./models/Pet');

const app = express();
const port = 3000;

app.use(cors());

// Configuración de body-parser con un límite de tamaño mayor para manejar imágenes grandes
app.use(bodyParser.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Configuración de Sequelize
const sequelize = new Sequelize('pets_management', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

// Definición del modelo User
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

// Asegurarse de que la carpeta 'uploads' exista para almacenar imágenes
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Configuración de multer para almacenar las imágenes en la carpeta 'uploads'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Sincroniza los modelos con la base de datos
sequelize.sync()
    .then(() => console.log("Base de datos sincronizada"))
    .catch(err => console.error("Error al sincronizar la base de datos:", err));

// Rutas de la API para Usuarios
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword });
        res.status(201).json({ message: 'Usuario creado', userId: newUser.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
});

// Ruta de inicio de sesión
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        res.json({ message: 'Inicio de sesión exitoso', userId: user.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});

// Ruta para crear una mascota, incluyendo la subida de imagen
app.post('/users/:userId/pets', upload.single('photo'), async (req, res) => {
    const { userId } = req.params;
    const { name, type, breed, age } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : null; // Cambiado para guardar la URL relativa

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const pet = await Pet.create({ name, type, breed, age, photo, userId });
        res.status(201).send(pet);
    } catch (error) {
        console.error('Error al agregar la mascota:', error);
        res.status(500).send({ message: 'Error al agregar la mascota', error });
    }
});


// Ruta para obtener una mascota por ID
app.get('/pets/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const pet = await Pet.findByPk(id);
        if (!pet) {
            return res.status(404).send({ message: 'Pet not found' });
        }
        res.send(pet);
    } catch (err) {
        return res.status(500).send(err);
    }
});

// Ruta para obtener mascotas por usuario
app.get('/users/:userId/pets', async (req, res) => {
    const { userId } = req.params;

    try {
        const pets = await Pet.findAll({ where: { userId } });
        res.json(pets);
    } catch (error) {
        console.error('Error al obtener mascotas:', error);
        res.status(500).json({ message: 'Error al obtener las mascotas' });
    }
});

// Ruta para actualizar una mascota, incluyendo la posibilidad de actualizar la imagen
app.put('/pets/:id', upload.single('photo'), async (req, res) => {
    const id = req.params.id;
    const { name, type, breed, age } = req.body;
    const photo = req.file ? req.file.path : undefined;

    try {
        const pet = await Pet.findByPk(id);
        if (!pet) {
            return res.status(404).send({ message: 'Pet not found' });
        }

        await pet.update({ name, type, breed, age, ...(photo && { photo }) });
        res.send(pet);
    } catch (error) {
        console.error('Error al actualizar la mascota:', error);
        res.status(500).send(error);
    }
});

// Ruta para eliminar una mascota
app.delete('/pets/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const pet = await Pet.findByPk(id);
        if (!pet) {
            return res.status(404).send({ message: 'Pet not found' });
        }
        await pet.destroy();
        res.sendStatus(204);
    } catch (err) {
        return res.status(500).send(err);
    }
});

// Servir las imágenes de la carpeta 'uploads' al front-end
app.use('/uploads', express.static('uploads'));

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
