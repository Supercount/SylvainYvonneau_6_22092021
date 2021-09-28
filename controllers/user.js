const User = require('../models/Users');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = (req, res, next) => {
    bcryptjs.hash(req.body.password,10)
    .then( hash => {
        const user = new User({
            email : req.body.email,
            password : hash
        });
        user.save()
        .then( () => res.status(201).json({message : "Utilisateur inscrit!"}))
        .catch(error => {
            return res.status(400).json({error : error});
        });
    })
    .catch( error => {
        return res.status(500).json({error : error});
    })
};

exports.login = (req, res, next) => {
    User.findOne({email : req.body.email})
    .then( user => {
        if (user == null) {
            return res.status(401).json({error : "Utilisateur inexistant!"});
        } else {
            bcryptjs.compare(req.body.password,user.password)
            .then( isValid => {
                if (isValid) {
                    return res.status(200).json({
                        userId : user._id,
                        token : jwt.sign({userId : user._id}, process.env.SECRET_TOKEN, {expiresIn : "1d"})
                    });
                } else {
                    return res.status(401).json({error : "Mot de passe incorrect!"});
                }
            })
            .catch(error => {
                return res.status(500).json({error : error});
            })
        }
    })
    .catch( error => {
        return res.status(500).json({error : error});
    });
};