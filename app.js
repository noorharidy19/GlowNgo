    const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const adminRouter = require('./routes/adminroute');
const adminPRouter = require('./routes/adminProute');
const navRouter = require('./routes/navRoute');
const adminUroute = require('./routes/adminUroute');
var methodOverride = require('method-override');
const session = require('express-session');
const loginroutes = require('./routes/login');
const signupRoute = require('./routes/signuproute');
const profileRoutes = require('./routes/profile');
const shoproute = require('./routes/ShopRoute');
// const validator = require('express-validator');
// const {check,validationResult} = require('express-validator');
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.json());
// app.get('/',(req,res)=>{
//     res.render('contact',{errors: ''});
// });

// Serve static files from the "public" directory, and tell clients to cache the files for 7 days
app.use(express.static("public", { maxAge: "7d" }));
app.use(adminRouter);
app.use(adminPRouter);
app.use(navRouter);
app.use(adminUroute);
app.set('view engine', 'ejs');
app.use(loginroutes);
app.use(signupRoute);
app.use(shoproute);
app.use('/profile', profileRoutes);

// Define a router and a route handler
const router = express.Router();
router.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Use the router
app.use(router);
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  }));
// Correct MongoDB connection string
// const dbURI='mongodb+srv://Noor:haridy20@cluster0.oetujgm.mongodb.net/projectDb?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(process.env.MONGODB_URI)
    .then((result) => {
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((err) => console.log(err));
// mongoose.connect(dbURI)
//     .then((result) => {
//         console.log('Connected to MongoDB');
//         app.listen(3000, () => {
//             console.log('Server is running on port 3000');
//         });
//     })
//     .catch((err) => console.log(err));