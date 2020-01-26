const mongoose = require('mongoose');
const passport = require('passport');


const User = mongoose.model('User');
const employee = mongoose.model('Employee');
//registration call
module.exports.register = (req, res, next) => {
    var user = new User();
    user.firstName = req.body.firstName;
    user.middleName = req.body.middleName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.mobileNumber = req.body.mobileNumber;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}
//login call
module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}
