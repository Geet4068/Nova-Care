const jwt = require('jsonwebtoken');
const { errorCode } = require('../helper/Response');

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies?.['admin-token'] || req.headers['authorization']?.split(' ')[1]; 
        if (!token) {
            return res.redirect('/login');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { 
            _id: decoded._id,
            username: decoded.username,
            role: decoded.role
        };

        res.locals.user = req.user;

        next();
    } catch (error) {
        res.clearCookie('admin-token');
        res.redirect('/login');
    }
};

module.exports = authenticate;
