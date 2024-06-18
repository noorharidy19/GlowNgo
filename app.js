const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const adminRouter = require('./routes/adminroute');
const adminPRouter = require('./routes/adminProute');
const navRouter = require('./routes/navRoute');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Serve static files from the "public" directory, and tell clients to cache the files for 7 days
app.use(express.static("public", { maxAge: "7d" }));
app.use(adminRouter);
app.use(adminPRouter);
app.use(navRouter);
app.set('view engine', 'ejs');

// Define a router and a route handler
const router = express.Router();
router.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Use the router
app.use('/', router);

// Correct MongoDB connection string
const dbURI='mongodb+srv://Noor:haridy20@cluster0.oetujgm.mongodb.net/projectDb?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(dbURI)
    .then((result) => {
        console.log('Connected to MongoDB');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((err) => console.log(err));