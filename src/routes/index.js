import { Router } from 'express';
const router = Router();
import mysql from 'mysql2';

// Configurar conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tamskinho1007',
    database: 'cme'
});

// Ruta para obtener datos de inventario desde la base de datos
router.get('/inventario/datos', (req, res) => {
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

// Ruta para manejar la solicitud POST del formulario
router.post('/maquinaria/nueva', (req, res) => {
    const { codigo, nombre } = req.body;
    const estado = 'disponible'; // Valor predeterminado para el estado
    let tipo;

    // Verificar el nombre de la máquina y asignar el tipo adecuado
    if (nombre.toLowerCase() === 'cincelador') {
        tipo = 'Eléctrica';
    } else if (nombre.toLowerCase() === 'demoledor 10kg') {
        tipo = 'Eléctrica';
    } else {
        tipo = 'Combustión';
    }

    // Verifica que los datos no sean nulos
    if (!codigo || !nombre) {
        return res.status(400).json({ error: 'Código y nombre de máquina son requeridos' });
    }

    const sql = 'INSERT INTO maquinaria (codigo, nombre, tipo, estado) VALUES (?, ?, ?, ?)';
    db.query(sql, [codigo, nombre, tipo, estado], (err, result) => {
        if (err) {
            console.error('Error insertando nueva máquina:', err);
            res.status(500).json({ error: 'Error insertando nueva máquina', message: err.message });
        } else {
            res.json({ message: 'Nueva máquina agregada con éxito', id: result.insertId });
        }
    });
});

router.get('/', (req, res) => res.render('index', { title: 'CME | Login' }));
router.get('/home', (req, res) => res.render('home', { title: 'CME | Home' }));
router.get('/Factura', (req, res) => res.render('factura', { title: 'CME | Factura' }));
router.get('/despacho', (req, res) => res.render('despacho', { title: 'CME | Guia de despacho' }));
router.get('/interna', (req, res) => res.render('interna', { title: 'CME | Guia interna' }));
router.get('/inventario', (req, res) => res.render('inventario', { title: 'CME | Inventario' }));
router.get('/addMaquinaria', (req, res) => res.render('addmaquinaria', { title: 'CME | Agregar Maquinaria' }));

export default router;
