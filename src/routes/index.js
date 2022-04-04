const express = require('express');
const router = express.Router();
const multer = require('multer');

router.get('/', (req, res) => {
    res.render('inicio');
});


//GUARDAR IMAGEN
router.post('/subir', multer, (req, res) => {
    console.log(req.file);
    res.render('/vistas');
});

module.exports = router;