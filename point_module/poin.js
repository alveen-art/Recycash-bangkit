const { PrismaClient } = require('@prisma/client');
const {authheader} = require('../autentication authorization/auhorization');
const {getiduser} = require('../autentication authorization/bridging');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();


async function getpoint(request, h) {
    try {
      const code_plastic = request.params.id;
       //const x = await authheader(request, h);
      //const authHeader = request.headers.authorization.split(' ')[1];
      //const y = jwt.decode(authHeader);
      //const email = y.userId.email;
      const user = await getiduser(request, h);
      const createdAt = new Date();
 // Panggil fungsi di sini
 console.log(user);
      
      //const user = await prisma.user.findFirst({where:{email: email},select:{id_user:true}});
     
      
      // console.log(code_plastic);
      const point = await prisma.plastic_point.findFirst  ({
        where: {
          plastic_code: code_plastic,
        },select: {
          plastic_point: true
        }
        
      });
  
    const addpoint = await prisma.poin.create({
          data: {
            point_amount: parseInt(point.plastic_point),
            poin_type: 'getpoint',
            date: createdAt,
            id_user:user.id_user
          },
        });
        console.log(user.id_user);
        return h.response({
          error: '-',
          message: 'Poin saved successfully',
          statusCode: 200,
        }).code(200);
      
     
    } catch (error) {
      console.error(error);
      return h.response({
        error: 'INTERNAL_SERVER_ERROR',
        message: 'Internal server error',
        statusCode: 500,
      }).code(500);
    }
  }

  async function getAllPoint() {
    try {
      const data = await prisma.plastic_point.findMany();
      console.log(data)
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get data');
    }
  }

    async function totalpoint (request, h)  {
      try {
    
          const user = await getiduser(request, h);
          console.log(user);
  
        const countplus = await prisma.poin.aggregate({
          _sum: {
            point_amount: true, // Replace 'yourIntegerField' with the actual name of your integer field
          },
          where: {
            id_user : user.id_user, // Replace 'user_id' with the actual name of the user_id field
            poin_type:'getpoint'
          },
      });
        

        const countminus = await prisma.poin.aggregate({
          _sum: {
            point_amount: true, // Replace 'yourIntegerField' with the actual name of your integer field
          },
          where: {
            id_user : user.id_user, // Replace 'user_id' with the actual name of the user_id field
            poin_type:'usepoint'
          },
      });
      const totalPlus = countplus._sum.point_amount || 0;
    const totalMinus = countminus._sum.point_amount || 0;

      const total_point = totalPlus - totalMinus;

      const addtotalpoint = await prisma.user.update({
        where: {
          id_user: user.id_user, // Access the user ID directly from the user object
        },
        data: {
          total_point: parseInt(total_point),
        },
      });
      return h.response({
        error: '-',
        message: 'Poin saved successfully',
        statusCode: 200,
        //poinMasuk,
      }).code(200);
      return addtotalpoint;
      
      } catch (error) {
        console.error(error);
        return h.response({
          error: 'INTERNAL_SERVER_ERROR',
          message: 'Internal server error',
          statusCode: 500,
        }).code(500);
      }
      
    };
  async function gettotalpoint (request,h) {
   
    try {
      const user = await getiduser(request, h);
      // Panggil fungsi di sini
      console.log(user.id_user);
      const userpoint = await prisma.user.findUnique({
        where: {
          id_user: parseInt(user.id_user),
        },
        select: {
          total_point: true,
          name: true
        },
      });
      
      return userpoint;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get profile');
    }
  }
  async function listpointhistory (request,h) {
 
    try {
      const user = await getiduser(request, h);
      // Panggil fungsi di sini
      console.log(user);
  
      const userhistory = await prisma.poin.findMany({
        where: {
          id_user: parseInt(user.id_user),
        },
        select: {
          point_amount: true,
          poin_type: true,
          date: true
        },
      });
     
      return userhistory;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get profile');
    }
  }
module.exports = {
  getpoint,getAllPoint,totalpoint,gettotalpoint,listpointhistory,
};