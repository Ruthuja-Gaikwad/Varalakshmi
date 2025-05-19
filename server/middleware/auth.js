const jwt = require('jsonwebtoken');
require('dotenv').config();
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('🔐 Received Authorization Header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('❌ No Bearer token');
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];
  console.log('🪙 Extracted Token:', token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Decoded Token:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('❌ JWT verification error:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};


module.exports = { authenticateAdmin };
