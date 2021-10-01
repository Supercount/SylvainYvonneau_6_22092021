
module.exports = (req, res, next) => {
    const regex = /^[a-zA-Z][ \'\-a-zA-Z0-9]*$/;
    if (!regex.test(req.body.name) || !regex.test(req.body.manufacturer) || !regex.test(req.body.description) || !regex.test(req.body.mainPepper)) {
        res.status(403).json({message : "Vous ne pouvez pas utiliser de caractères spéciaux pour remplir ce formulaire!"})
    } else {
        next();
    }
};
