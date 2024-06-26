
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
    const adminURouter = require('./routes/adminUroute');
    const loginroutes = require('./routes/login');
    const profileRoutes = require('./routes/profile');
    const shoproute = require('./routes/ShopRoute');
    const auth = require('./routes/authRoutes');
    const nav = require('./routes/navRoute');
    const cartRoutes = require('./routes/cartRoutes');
    const wishlistRoute = require('./routes/wishlistRoute');
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
    app.use(adminURouter);
    app.use(shoproute);
    app.use(profileRoutes);
    app.use('/checkout', checkoutRoutes);
    app.use('/addToCart', cartRoutes);
    app.use('/api/cart', wishlistRoute);
    app.get('/currentApi', async (req, res) => {
        const rates = await fetchExchangeRates();
        res.render('Eyes', { exchangeRates: rates });
      });
    app.get('/', (req, res) => {
        const showConfirmationPopup = req.query.showConfirmationPopup === 'true';
        const email = req.query.email || '';
        res.render("Home", {
          user: req.session.user || "",
          message: req.query.loginRequired ? "You must log in to view this page." : "",
          showConfirmationPopup,
          email
        });
      });
      
    
      app.use((req, res, next) => {
        res.status(404).render("404");
      });
    // Debug route
    app.get('/debug', (req, res) => {
        res.send(`User: ${req.session.user ? req.session.user.username : 'Not logged in'}`);
    });
    
   
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log('Connected to MongoDB');
            app.listen(process.env.PORT, () => {
                console.log(`Server is running on ${process.env.PORT}`);
            });
        })
        .catch((err) => console.log(err));
    