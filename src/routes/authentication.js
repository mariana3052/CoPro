const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn  } = require('../lib/auth');

router.get('/registrar', isNotLoggedIn, (req, res) => {
    res.render('auth/registrar');
});

router.post('/registrar', isNotLoggedIn,  passport.authenticate('local.registrar', {
    successRedirect: '/profile',
    failureRedirect:'/registrar',
    failureFlash: true
}));

router.get('/login', isNotLoggedIn,  (req, res) => {
    res.render('auth/signin');
});

router.post('/login', isNotLoggedIn,  (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect:'/profile',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/login');
});

module.exports = router;