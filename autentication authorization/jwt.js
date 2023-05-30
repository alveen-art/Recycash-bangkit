const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_KEY, { algorithm: process.env.ALGORITHMS, expiresIn: '1h' });
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    return decoded.userId;
  } catch (error) {
    return null;
  }
};


module.exports = {
  generateToken,
  verifyToken,
  
};
