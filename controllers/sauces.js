const Sauce = require('../models/Sauces');

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then( retour => {
        return res.status(200).json(retour);
    })
    .catch( error => {
        return res.status(400).json({error : error});
    })
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id : req.params.id})
    .then( retour => {
        return res.status(200).json(retour);
    })
    .catch( error => {
        return res.status(404).json({error : error});
    })
};

exports.createSauce = (req, res, next) => {

};

exports.modifySauce = (req, res, next) => {

};

exports.deleteSauce = (req, res, next) => {

};

exports.likeSauce = (req, res, next) => {

};
