const express = require('express');
const routeur = express.Router();

const userCtrl = require('../controllers/user');
const mailValid = require('../middleware/validerMail');
const antiForce = require('../middleware/bruteForce');

routeur.post('/signup', mailValid, userCtrl.signup);
routeur.post('/login', mailValid, antiForce, userCtrl.login);

module.exports = routeur;