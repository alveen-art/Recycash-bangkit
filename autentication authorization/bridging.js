
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const getiduser = async (request, h) => {
    try {
      const authHeader = request.headers.authorization.split(' ')[1];
      const y = jwt.decode(authHeader);
      const email = y.userId.email;
      const user = await prisma.user.findFirst({where:{email: email},select:{id_user:true}});
      
      return user;
      
  
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
    getiduser
  };