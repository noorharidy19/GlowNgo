
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        res.redirect('/login'); // Redirect to login if user is not authenticated
    }
}

module.exports = isAuthenticated;