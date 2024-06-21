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
 }else{
  res.send("wrong password");
 }

}catch{
    res.send("wrong details");
  }
};

// const loginProcess = async (req, res) => {
// try {
//   const user = req.session.user;
//   if (!user) {
//     return res.status(404).send('User not found');
//   }

//   if (req.headers.accept && req.headers.accept.indexOf('application/json') !== -1) {

//     return res.json(user);
//   } else {

//     return res.render('Home', {
//       currentPage: 'Home',
//       user: user,
//     });
//   }
// } catch (err) {
//   console.error('Error fetching user:', err);
//   res.status(500).send('Server error');
// }
// };
// const loginProcess = async (req, res) => {
//   try {
//     const { username, password } = req.body;
module.exports = {
  loginProcess
};
