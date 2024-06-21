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

const deleteUsers = (req,res)=>{
  User.findByIdAndDelete(req.params.id).then(()=>{
      res.redirect("/user");
  }).catch((err)=>{
      console.log(err);
  });
}

module.exports = {
  getUsers,
  deleteUsers
};