const User = require("../models/User");
const path = require("path");

module.exports = (req, res) => {
  User.create(req.body)
    .then((user) => {
      res.redirect("/");
    })
    .catch((error) => {
      let validationErrors = Object.keys(error.errors).map((key) => error.errors[key].message);
      //console.log(error) ;
      //req.session.validationErrors = validationErrors;
      req.flash('validationErrors',validationErrors);
      req.flash('data',req.body);
      res.redirect("/auth/register");
    });
};
