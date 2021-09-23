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
    })
    .catch()
};

exports.login = (req, res, next) => {
    
};