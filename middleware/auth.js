const jwt = require('jsonwebtoken');
const config = require('config');
module.exports = (req, res, next) => {
  //Get Token from Header
  const token = req.header('x-auth-token');

  //Check if Not Token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  //verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not Valid' });
  }
};
