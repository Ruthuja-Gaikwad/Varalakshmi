const jwt = require('jsonwebtoken');

const authenticateAdmin = (req, res, next) => {
  console.log('🔐 Executing authenticateAdmin middleware');
  const authHeader = req.headers.authorization;
  console.log('📩 Received Authorization Header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('🚫 No Bearer token');
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];
  console.log('🪙 Extracted Token:', token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Decoded Token:', decoded);

    if (!decoded || !decoded.email || !decoded.role) {
      console.log('⚠️ Decoded token missing required fields');
      return res.status(401).json({ error: 'Invalid token payload' });
    }

    if (decoded.role !== 'admin') {
      console.log('🚫 User is not admin');
      return res.status(403).json({ error: 'Forbidden: Admins only' });
    }

    req.user = decoded;

    console.log('➡️ Passed authenticateAdmin, proceeding to next middleware...');
    next();
  } catch (err) {
    console.error('❌ JWT verification error:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = { authenticateAdmin };
