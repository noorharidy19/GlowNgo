
const checkoutRoutes = require('./routes/checkout');
    const express = require('express');
    const bodyParser = require('body-parser');
    const path = require('path');
    const mongoose = require('mongoose');
    const methodOverride = require('method-override');
    const session = require('express-session');
    require('dotenv').config();
    
    const adminRouter = require('./routes/adminroute');
    const adminPRouter = require('./routes/adminProute');
    const loginroutes = require('./routes/login');
    const profileRoutes = require('./routes/profile');
    const shoproute = require('./routes/ShopRoute');
    const auth = require('./routes/authRoutes');
    
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(methodOverride('_method'));
    app.use(express.json());
    app.use(express.static("public", { maxAge: "7d" }));
    
    // Session middleware
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: process.env.NODE_ENV === 'production' // Use secure cookies in production
        }
    }));
    
    // Set view engine
    app.set('view engine', 'ejs');
    
    // Use routes
    
    
    // app.use(loginroutes);
    app.use(auth);
    app.use(adminRouter);
    app.use(adminPRouter);
    app.use(shoproute);
    app.use('/profile', profileRoutes);
    app.use('/checkout', checkoutRoutes);
    
    // Debug route
    app.get('/debug', (req, res) => {
        res.send(`User: ${req.session.user ? req.session.user.username : 'Not logged in'}`);
    });
    
    // Catch-all for 404
    // Define all your routes here
    
    // ... other routes
    
    // Catch-all for 404 should be the last route
    app.use((req, res) => {
        res.status(404).render("404", {
            currentPage: "404",
            user: req.session.user || "",
        });
    });
    // Connect to MongoDB and start server
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log('Connected to MongoDB');
            app.listen(process.env.PORT, () => {
                console.log(`Server is running on ${process.env.PORT}`);
            });
        })
        .catch((err) => console.log(err));
    