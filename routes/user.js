const express = require('express');
const routeur = express.Router();

const userCtrl = require('../controllers/user');
const mailValid = require('../middleware/validerMail');

routeur.post('/signup', mailValid, userCtrl.signup);
routeur.post('/login', userCtrl.login);

module.exports = routeur;