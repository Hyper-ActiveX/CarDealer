const jwt = require('jsonwebtoken');

const secretKey = 'jay123456'; 

// Function to generate a JWT token
const generateToken = (user) => {
  return jwt.sign(user, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = { generateToken, verifyToken };
