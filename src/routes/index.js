import {Router} from 'express'
const router = Router()

router.get('/', (req, res) => res.render('index', {title: 'CME | Login'}))

router.get('/home', (req, res) => res.render('home', {title: 'CME | Home'}))

router.get('/Factura', (req, res) => res.render('factura', {title: 'CME | Factura'}))

router.get('/despacho', (req, res) => res.render('despacho', {title: 'CME | Guia de despacho'}))

router.get('/interna', (req, res) => res.render('interna', {title: 'CME | Guia interna'}))

router.get('/inventario', (req, res) => res.render('inventario', {title: 'CME | Inventario'}))

export default router