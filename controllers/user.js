const path = require('path');
const User = require("../models/users");

const getUsers = (req, res) => {
    User.find()
        .then(result => {
            res.render('users', { users: result });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error retrieving users');
        });
};
module.exports = {
  getUsers
};