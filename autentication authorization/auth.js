
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {getiduser} = require('./bridging');
const {generateToken} = require('./jwt');
const prisma = new PrismaClient();


// register pada aplikasi
async function register (request,h) {
  try {
    const { email, password, name, phone_number } = request.payload;
    console.log(email)

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log(hashedPassword)
    // Create the user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone_number
      },
    });

    return { message: 'User registered successfully', user };
  } catch (error) {
    console.error(error);
    return h.response({
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error',
      statusCode: 500,
    }).code(500);
  }
}

//login pada aplikasi
async function login (request,h){
  try {
    const { email, password } = request.payload;

    // Find the user by email
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return h.response({
        error: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password',
        statusCode: 401,
      }).code(401);
    }

    // Check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return h.response({
        error: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password',
        statusCode: 401,
      }).code(401);
    }

    // Generate a JWT token
    const tokenformat = {
      email:email,
      isPasswordValid: isPasswordValid
    }
    const token = generateToken (tokenformat);

    return { message: 'Login successful', token };
  } catch (error) {
    console.error(error);
    return h.response({
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error',
      statusCode: 500,
    }).code(500);
  }
}


// menampilkan nama dan email ketika berada di halaman profile
async function getProfile (request,h) {
  
  try {
   // const userId = request.params.id;
    const user = await getiduser(request, h);
    // Panggil fungsi di sini
    console.log(user);

    const userdata = await prisma.user.findUnique({
      where: {
        id_user: parseInt(user.id_user),
      },
      select: {
        name: true,
        email: true,
        phone_number: true
      },
    });

    return userdata;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get profile');
  }
}

async function getAllData() {
  try {
    const data = await prisma.user.findMany();
    console.log(data)
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get data');
  }
}

module.exports ={
  getProfile, getAllData, login, register
};