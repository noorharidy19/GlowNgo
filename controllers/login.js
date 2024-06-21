const User = require("../models/users"); // Assuming you have a User model defined
const bcrypt = require('bcryptjs');

const loginProcess = async (req, res) => {
  try{
    const check = await User.findOne({username: req.body.username});
   if(!check){
    res.send("username not found");
  }
 const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
 if(isPasswordMatch){
  res.redirect('/home');
  console.log("login successful");
  console.log("welcome to home page" + req.body.username);
 }else{
  res.send("wrong password");
 }

}catch{
    res.send("wrong details");
  }
};
module.exports = {
  loginProcess
};
