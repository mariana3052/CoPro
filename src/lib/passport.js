const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('./helpers');

//Login
passport.use('local.signin', new LocalStrategy({
    usernameField:'Usuario',
    passwordField: 'Contrasena',
    passReqToCallback: true
}, async (req, Usuario, Contrasena, done) => {
    const rows = await pool.query('SELECT * FROM Usuarios WHERE Usuario = ?', [Usuario]);
    
    if(rows.length > 0) {
        const user = rows[0];
        const validContrasena = await helpers.matchPassword(Contrasena, user.Contrasena);
        if(validContrasena) {
            done(null, user, req.flash('success', 'Bienvenid@ ' + user.Usuario));
        }
        else {
            done(null, false, req.flash('message','Contraseña invalida'));
        }
    }
    else {
        return done(null, false, req.flash('message','El usuario no existe'));
    }
}));

//Registrar
passport.use('local.registrar', new LocalStrategy({
    usernameField: 'Usuario',     
    passwordField: 'Contrasena',
    passReqToCallback: true
}, async (req, Usuario, Contrasena, done) => {
    try{
        const { Nombre } = req.body;
        const newUser = {
            Nombre,
            Usuario,
            Contrasena
        };
        newUser.Contrasena = await helpers.encryptPassword(Contrasena);
        const result = await pool.query('INSERT INTO Usuarios SET ?', newUser);
        newUser.Id = result.insertId;
        return done(null, newUser);
    }
    catch(error){
        console.log(error);
    }
}));

passport.serializeUser((Usuario, done) => {
    done(null, Usuario.Id);
});

passport.deserializeUser(async(Id, done) => {
    const row = await pool.query('SELECT * FROM Usuarios WHERE Id = ?', [Id]);
    done(null, row[0]);
});