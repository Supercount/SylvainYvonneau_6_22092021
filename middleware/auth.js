const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verifiedToken = jwt.verify(token,process.env.SECRET_TOKEN);
        const userToken = verifiedToken.userId;
        if (req.body.userId && req.body.userId !== userToken) {
            throw "unauthorized request"
        } else {
            next();
        }
    } catch (erreur) {
        return res.status(403).json({error : erreur | "Authentification incorrecte."});
    }
};

