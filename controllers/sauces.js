const Sauce = require('../models/Sauces');
const fs = require('fs');


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
    const newSauce = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        userId : newSauce.userId,
        name : newSauce.name,
        manufacturer : newSauce.manufacturer,
        description : newSauce.description,
        mainPepper : newSauce.mainPepper,
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        heat : newSauce.heat,
        likes : 0,
        dislikes : 0,
        usersLiked : [""],
        usersDisiked : [""]
    });
    sauce.save()
    .then( () => {
        return res.status(201).json({ message : "Sauce créée!"});
    })
    .catch( erreur => {
        return res.status(400).json({error : erreur});
    });
};

exports.modifySauce = (req, res, next) => {

};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id : req.params.id})
    .then( sauce => {
        const imageSauce = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${imageSauce}`,() => {
            Sauce.deleteOne({_id : req.params.id})
            .then( () => {
                return res.status(200).json({message : "Sauce supprimée!"});
            })
            .catch(err => {
                return res.status(400).json({error : err});
            });
        });
        return res.status(200).json(retour);
    })
    .catch( error => {
        return res.status(404).json({error : error});
    })
};

exports.likeSauce = (req, res, next) => {

};
