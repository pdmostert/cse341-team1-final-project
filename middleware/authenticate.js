const isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) {
        return res.status(401).json({ message: "You do not have access" });
    }
    next();
};

const isAdmin = (req, res, next) => {
    // Check if the user is authenticated and has the 'admin' role
    if (req.session.user && req.session.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: "You do not have access. Admins only." });
    }
};

module.exports = { isAuthenticated, isAdmin };