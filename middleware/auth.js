const jwt = require('jsonwebtoken');

const identification = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verifiedToken = jwt.verify(token,process.env.SECRET_TOKEN);
        const userToken = verifiedToken.userId;
        if (req.body.userId != userToken) {
            throw "Utilisateur non reconnu!"
        } else {
            next();
        }
    } catch (erreur) {
        return res.status(401).json({error : erreur | "Authentification incorrecte."});
    }
};

module.exports = identification;