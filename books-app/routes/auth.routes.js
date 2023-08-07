const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const { isLoggedOut } = require('../middlewares/route-guard');

const saltRounds = 10


// Signup form (render)
router.get('/registro', isLoggedOut, (req, res) => {
    res.render('auth/signup')
})

// Signup form (handler)
router.post('/registro', isLoggedOut, (req, res, next) => {

    const { username, email, plainPassword } = req.body

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(plainPassword, salt))
        .then(hash => User.create({ username, email, password: hash }))
        .then(() => res.redirect('/inicio-sesion'))
        .catch(err => next(err))
})


// Login form (render)
router.get('/inicio-sesion', isLoggedOut, (req, res) => {
    res.render('auth/login')
})

// Login form (handler)
router.post('/inicio-sesion', isLoggedOut, (req, res, next) => {

    const { email, password } = req.body

    if (email.length === 0 || password.length === 0) {
        res.render('auth/login', { errorMessage: 'Rellena todos los campos' })
        return
    }

    User
        .findOne({ email })
        .then(foundUser => {

            if (!foundUser) {
                res.render('auth/login', { errorMessage: 'Usuari@ no reconocido' })
                return
            }

            if (!bcrypt.compareSync(password, foundUser.password)) {
                res.render('auth/login', { errorMessage: 'Contraseña incorrecta' })
                return
            }

            req.session.currentUser = foundUser // login!
            res.redirect('/')
        })
        .catch(err => next(err))
})



router.get('/cerrar-sesion', (req, res) => {
    req.session.destroy(() => res.redirect('/'))
})


module.exports = router