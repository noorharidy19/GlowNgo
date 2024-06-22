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
      res.redirect("/users");
  }).catch((err)=>{
      console.log(err);
  });
}
const updateUser = (req, res) => {
    console.log('Received update request for ID:', req.params.id);
    console.log('Request body:', req.body);
    
    let updateObject = { ...req.body };

    // Remove properties that are empty strings
    for (let prop in updateObject) {
        if (updateObject[prop] === '') {
            delete updateObject[prop];
        }
    }
  
    console.log('Update object:', updateObject);
  
    User.findByIdAndUpdate(req.params.id, updateObject, { new: true, runValidators: true })
        .then((updatedUser) => {
            if (!updatedUser) {
                return res.status(404).send('User not found');
            } else {
                console.log("User updated successfully:", updatedUser);
                res.redirect("/users");
            }
        })
        .catch((err) => {
            console.error('Error updating user:', err);
            res.status(500).send('Error updating user');
        });
};

module.exports = {
  getUsers,
  deleteUsers,
  updateUser
};