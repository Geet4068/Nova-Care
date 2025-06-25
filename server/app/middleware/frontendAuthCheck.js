const jwt = require('jsonwebtoken');
const { errorCode } = require('../helper/Response');

const frontendAuthCheck = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader?.split(' ')[1];

        if (!token) {
            console.log('No token provided, please login.');
            return res.status(401).json({
                status: errorCode.unauthorized,
                message: 'No token provided, please login.'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            _id: decoded._id,
        };

        res.locals.user = { _id: decoded._id };
        req.app.locals.user = { _id: decoded._id };

        // console.log('User authenticated successfully:', req.user._id);
        next();
    } catch (error) {
        res.clearCookie('token');
        return res.status(401).json({
            status: errorCode.unauthorized,
            message: 'Invalid or expired token, please login.',
            error: error.message
        });
    }
};

module.exports = frontendAuthCheck;