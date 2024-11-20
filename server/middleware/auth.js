const jwt = require('jsonwebtoken');

// Middleware to check if the JWT token exists in the cookie and is valid
const auth = (req, res, next) => {
  const token = req.cookies.token;
  

  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. No token provided.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user info to the request object for use in later middleware or route handlers
    req.user_id = decoded.id;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.',
    });
  }
};

module.exports = auth;
