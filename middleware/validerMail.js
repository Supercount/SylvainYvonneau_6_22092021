
module.exports = (req, res, next) => {
    let regex = /^[a-z0-9]+([_|\.|-][a-z0-9]+)*@[a-z0-9]{4,10}[\.][a-z]{2,4}$/ ;
    if (!regex.test(req.body.email)) {
        res.status(403).json({message : "Utilisez une adresse mail valide!"})
    } else {
        next();
    }
}