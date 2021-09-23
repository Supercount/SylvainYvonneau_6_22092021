const express = require('express');
const routeur = express.Router();

const userCtrl = require('../controllers/user');

routeur.post('/signup', userCtrl.signup);
routeur.post('/login', userCtrl.login);

module.exports = routeur;