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
        usersLiked : [],
        usersDisliked : []
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
    if (req.file != null) {
        Sauce.findOne({_id : req.params.id})
        .then( sauce => {
            const imageSauce = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${imageSauce}`,() => {});
        })
        .catch(error => {
            return res.status(404).json({error : error});
        });
    }
    const newSauce = (req.file != null) ? {
        userId : JSON.parse(req.body.sauce).userId,
        name : JSON.parse(req.body.sauce).name,
        manufacturer : JSON.parse(req.body.sauce).manufacturer,
        description : JSON.parse(req.body.sauce).description,
        mainPepper : JSON.parse(req.body.sauce).mainPepper,
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        heat : JSON.parse(req.body.sauce).heat,
        likes : JSON.parse(req.body.sauce).likes,
        dislikes : JSON.parse(req.body.sauce).dislikes,
        usersLiked : JSON.parse(req.body.sauce).usersLiked,
        usersDisliked : JSON.parse(req.body.sauce).usersDisliked
    } : {
        userId : req.body.userId,
        name : req.body.name,
        manufacturer : req.body.manufacturer,
        description : req.body.description,
        mainPepper : req.body.mainPepper,
        imageUrl : req.body.imageUrl,
        heat : req.body.heat,
        likes : req.body.likes,
        dislikes : req.body.dislikes,
        usersLiked : req.body.usersLiked,
        usersDisliked : req.body.usersDisliked
    } ;
    Sauce.updateOne({_id : req.params.id}, {
        _id : req.params.id,
        userId : newSauce.userId,
        name : newSauce.name,
        manufacturer : newSauce.manufacturer,
        description : newSauce.description,
        mainPepper : newSauce.mainPepper,
        imageUrl : newSauce.imageUrl,
        heat : newSauce.heat,
        likes : newSauce.likes,
        dislikes : newSauce.dislikes,
        usersLiked : newSauce.usersLiked,
        usersDisliked : newSauce.usersDisliked
    })
    .then( () => {
        return res.status(200).json({message : "Sauce modifiée!"});
    })
    .catch( (err) => {
        return res.status(400).json({error : err});
    });
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
            .catch( (err) => {
                return res.status(400).json({error : err});
            });
        });
    })
    .catch( error => {
        return res.status(404).json({error : error});
    })
};

exports.likeSauce = (req, res, next) => {
    const valeur = req.body.like;
    const user = req.body.userId;
    switch (valeur) {
        case 1:
        Sauce.findOne({_id : req.params.id})
        .then( (sauce) => {
            if (sauce.usersLiked.indexOf(user) > -1) {
                return res.status(403).json({message : "Vous aimez déjà cette sauce!"});
            } else if (sauce.usersDisliked.indexOf(user) > -1) {
                const newLikes = sauce.likes + 1;
                const newDislikes = sauce.dislikes - 1;
                Sauce.updateOne({_id : req.params.id}, {
                    _id : req.params.id,
                    likes : newLikes,
                    dislikes : newDislikes,
                    $push : { usersLiked : user },
                    $pull : { usersDisliked : user }
                })
                .then( () => {
                    return res.status(200).json({message : "Sauce modifiée!"});
                })
                .catch( (err) => {
                    return res.status(400).json({error : err});
                });
            } else {
                const newLikes = sauce.likes + 1;
                Sauce.updateOne({_id : req.params.id}, {
                    _id : req.params.id,
                    likes : newLikes,
                    $push : { usersLiked : user }
                })
                .then( () => {
                    return res.status(200).json({message : "Sauce modifiée!"});
                })
                .catch( (err) => {
                    return res.status(400).json({error : err});
                });
            }
        })
        .catch( (err) => {
            return res.status(400).json({error : err});
        });
        break;
        case 0:
        Sauce.findOne({_id : req.params.id})
        .then( (sauce) => {
            if (sauce.usersDisliked.indexOf(user) > -1) {
                const newDislikes = sauce.dislikes - 1;
                Sauce.updateOne({_id : req.params.id}, {
                    _id : req.params.id,
                    dislikes : newDislikes,
                    $pull : { usersDisliked : user }
                })
                .then( () => {
                    return res.status(200).json({message : "Sauce modifiée!"});
                })
                .catch( (err) => {
                    return res.status(400).json({error : err});
                });
            } else if (sauce.usersLiked.indexOf(user) > -1) {
                const newLikes = sauce.likes - 1;
                Sauce.updateOne({_id : req.params.id}, {
                    _id : req.params.id,
                    likes : newLikes,
                    $pull : { usersLiked : user }
                })
                .then( () => {
                    return res.status(200).json({message : "Sauce modifiée!"});
                })
                .catch( (err) => {
                    return res.status(400).json({error : err});
                });
            } else {
                return res.status(403).json({message : "Votre avis sur cette sauce reste inchangé!"});
            }
        })
        .catch( (err) => {
            return res.status(400).json({error : err});
        });
        break;
        case -1:
        Sauce.findOne({_id : req.params.id})
        .then( (sauce) => {
            if (sauce.usersDisliked.indexOf(user) > -1) {
                return res.status(403).json({message : "Vous n'aimez déjà pas cette sauce!"});
            } else if (sauce.usersLiked.indexOf(user) > -1) {
                const newLikes = sauce.likes - 1;
                const newDislikes = sauce.dislikes + 1;
                Sauce.updateOne({_id : req.params.id}, {
                    _id : req.params.id,
                    likes : newLikes,
                    dislikes : newDislikes,
                    $pull : { usersLiked : user },
                    $push : { usersDisliked : user }
                })
                .then( () => {
                    return res.status(200).json({message : "Sauce modifiée!"});
                })
                .catch( (err) => {
                    return res.status(400).json({error : err});
                });
            } else {
                const newDislikes = sauce.dislikes + 1;
                Sauce.updateOne({_id : req.params.id}, {
                    _id : req.params.id,
                    dislikes : newDislikes,
                    $push : { usersDisliked : user }
                })
                .then( () => {
                    return res.status(200).json({message : "Sauce modifiée!"});
                })
                .catch( (err) => {
                    return res.status(400).json({error : err});
                });
            }
        })
        .catch( (err) => {
            return res.status(400).json({error : err});
        });
        break;
        default:
        break;
    }
};
