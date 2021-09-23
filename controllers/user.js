const User = require('../models/Users');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcryptjs.hash(req.body.password,20)
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
    
};