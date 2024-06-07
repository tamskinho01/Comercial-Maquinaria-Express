import express from 'express';
import {dirname, join} from 'path';
import { fileURLToPath} from 'url';
import indexRoutes from './routes/index.js';
import mysql from 'mysql2';

const app = express();

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
        throw err;
    }
    console.log('Conectado a MySQL');
});

// Ruta para obtener datos de inventario desde la base de datos
app.get('/inventario/datos', (req, res) => {
    let sql = 'SELECT * FROM maquinaria';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error obteniendo datos de inventario:', err);
            res.status(500).json({ error: 'Error obteniendo datos de inventario', message: err.message });
        } else {
            res.json(result);
        }
    });
});

// Ruta para servir el frontend
app.get('/inventario', (req, res) => {
    // Aquí puedes renderizar tu archivo HTML que contiene el frontend
    res.sendFile(join(__dirname, 'views'));
});


const __dirname = dirname(fileURLToPath(import.meta.url))

// Configurar archivos estáticos
app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'views', 'inventario.ejs'));
});

app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(indexRoutes)

app.listen(3000);
console.log('server listen on port', 3000)


