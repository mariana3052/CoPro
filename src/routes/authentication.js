const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/registrar', (req, res) => {
    res.render('auth/registrar');
});

router.post('/registrar', passport.authenticate('local.registrar', {
    successRedirect: '/profile',
    failureRedirect:'/registrar',
    failureFlash: true
}));

router.get('/profile', (req, res) => {
    res.send('profile');
});

module.exports = router;