import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import indexRoutes from './routes/index.js';
import mysql from 'mysql2';
import cookieParser from 'cookie-parser';

const app = express();

// Configuración para manejar datos JSON en las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tamskinho1007',
    database: 'cme'
});

// Conectar a MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        throw err;
    }
    console.log('Connected to MySQL');
});

const __dirname = dirname(fileURLToPath(import.meta.url));

// Ruta para servir el frontend (HTML, CSS, JavaScript)
app.use(express.static(join(__dirname, 'public')));

// Configurar las vistas y el motor de plantillas EJS
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configuracion de las cookies
app.use(cookieParser())

// Middleware para manejar las rutas definidas en indexRoutes
app.use('/', indexRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
