const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

//INSERTAR DATOS
router.get('/preguntas', (req, res)=>
{
    res.render('vistas/preguntas');
});

router.post('/preguntas', async(req, res)=>
{
    const { Titulo, Descripcion, Categoria, fkUsuario, Imagen } = req.body;
    const newPregunta = {
        Titulo, 
        Descripcion,
        Categoria,
        fkUsuario,
        Imagen
    };
    await pool.query('INSERT INTO Preguntas set ?', [newPregunta]);
    req.flash('success', 'Pregunta guardada correctamente');
    res.redirect('/vistas');
});

router.get('/respuestas', (req, res)=>
{
    res.render('vistas/respuestas');
});

router.post('/respuestas', async(req, res)=>
{
    const { Respuesta, fkPregunta, fkUsuario, Imagen } = req.body;
    const newRespuesta = {
        Respuesta, 
        fkPregunta,
        fkUsuario,
        Imagen
    };
    await pool.query('INSERT INTO Respuestas set ?', [newRespuesta]);
    req.flash('success', 'Respuesta guardada correctamente');
    res.redirect('/vistas/resp');
    //res.send('recibido');
});

//LISTAR DATOS
router.get('/', async (req, res) => {
    const Preguntas = await pool.query('SELECT * FROM Preguntas');
    console.log(Preguntas);
    res.render('vistas/listarpre', { Preguntas }); 
});

router.get('/resp', async (req, res) => {
    const Respuestas = await pool.query('SELECT * FROM Respuestas');
    console.log(Respuestas);
    res.render('vistas/listarres', { Respuestas }); 
});

//ELIMINAR DATOS
router.get('/delete/:Id', async (req, res) => {
    const { Id } = req.params;
    await pool.query('DELETE FROM Preguntas WHERE Id = ?', [Id]);
    req.flash('success', 'Pregunta eliminada correctamente');
    res.redirect('/vistas');
});

router.get('/resp/delete/:Id', async (req, res) => {
    const { Id } = req.params;
    await pool.query('DELETE FROM Respuestas WHERE Id = ?', [Id]);
    req.flash('success', 'Respuesta eliminada correctamente');
    res.redirect('/vistas/resp');
});

//EDITAR DATOS
router.get('/edit/:Id', async (req, res) => {
    const { Id } = req.params;
    const pre = await pool.query('SELECT * FROM Preguntas WHERE Id = ?', [Id]);
    res.render('vistas/editarpre', {pre: pre[0]});
});

router.post('/edit/:Id', async (req, res) => {
    const { Id } = req.params;
    const { Titulo, Descripcion, Categoria, fkUsuario, Imagen } = req.body;
    const newPregunta = {
        Titulo, 
        Descripcion,
        Categoria,
        fkUsuario,
        Imagen
    };
   console.log(newPregunta);
   await pool.query('UPDATE Preguntas set ? WHERE Id = ?', [newPregunta, Id]);
   req.flash('success', 'Pregunta actualizada correctamente');
   res.redirect('/vistas');
});

router.get('/resp/edit/:Id', async (req, res) => {
    const { Id } = req.params;
    const resp = await pool.query('SELECT * FROM Respuestas WHERE Id = ?', [Id]);
    res.render('vistas/editarres', {resp: resp[0]});
});

router.post('/resp/edit/:Id', async (req, res) => {
    const { Id } = req.params;
    const { Respuesta, fkPregunta, fkUsuario, Imagen } = req.body;
    const newRespuesta = {
        Respuesta, 
        fkPregunta,
        fkUsuario,
        Imagen
    };
   console.log(newRespuesta);
   await pool.query('UPDATE Respuestas set ? WHERE Id = ?', [newRespuesta, Id]);
   req.flash('success', 'Rsepuesta actualizada correctamente');
   res.redirect('/vistas/resp');
});

module.exports = router;