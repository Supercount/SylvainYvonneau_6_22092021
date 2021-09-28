const express = require('express');
const routeur = express.Router();

const sauceCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

routeur.post('/', auth, multer, sauceCtrl.createSauce);
routeur.put('/:id', auth, multer, sauceCtrl.modifySauce);
routeur.delete('/:id', auth, sauceCtrl.deleteSauce);
routeur.post('/:id/like', auth, sauceCtrl.likeSauce);
routeur.get('/', auth, sauceCtrl.getAllSauces);
routeur.get('/:id', auth, sauceCtrl.getOneSauce);


module.exports = routeur;