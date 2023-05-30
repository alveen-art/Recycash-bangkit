const { verifyToken } = require('./jwt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const authheader = async (request, h) => {
  try {
    const authHeader = request.headers.authorization.split(' ')[1];
  if (authHeader) {
    authData = verifyToken(authHeader);
  }
  if (authData.message == 'invalid token' || authData.message == 'jwt expired' || authData.message == 'jwt malformed' || authData.message == 'Unexpected token  in JSON at position 0') {
    const response = h.response({
      error: 'FORBIDDEN',
      message: authData.message,
      statusCode: 403,
    });
    response.code(403);
    return response;
  }
  } catch (error) {
    console.error(error);
    const response = h.response({
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error',
      statusCode: 500,
    });
    response.code(500);
    return response;
  }
};

module.exports = {
  authheader,
};
