const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  User.findOne({ username })
    .then(user => {
      if (user) {
        // Compare the password using bcrypt
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              // If passwords match, log the user in by setting the session
              req.session.userId = user._id;
              res.redirect('/');
            } else {
              // If password is incorrect, flash an error message
              req.flash('loginError', 'Invalid username or password');
              req.flash('data', { username }); // Persist username in form
              res.redirect('/auth/login');
            }
          })
          .catch(err => {
            // If there's an error in bcrypt comparison
            req.flash('loginError', 'Something went wrong. Please try again.');
            res.redirect('/auth/login');
          });
      } else {
        // If no user is found, flash an error
        req.flash('loginError', 'Invalid username or password');
        req.flash('data', { username }); // Persist username in form
        res.redirect('/auth/login');
      }
    })
    .catch(err => {
      // Handle other errors
      req.flash('loginError', 'Something went wrong. Please try again.');
      res.redirect('/auth/login');
    });
};
