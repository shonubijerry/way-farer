import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.SECRET_KEY;

const expirationTime = 86400;

/**
* function to generate token
* @param {Object} userObject
* @returns {Object} generateToken
 */
const generateToken = ({
  id, is_admin,
}) => jwt.sign({
  id, is_admin,
}, secretKey,
{
  expiresIn: expirationTime,
});

export default generateToken;
