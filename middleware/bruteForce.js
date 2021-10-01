const rateLimit = require("express-rate-limit");

const antiForce = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "Vous avez effectué trop de tentatives de connexion. Veuillez réessayer dans une heure!"
});

module.exports = antiForce;