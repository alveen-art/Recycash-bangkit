const {getProfile,getAllData,login,register} = require('./autentication authorization/auth');
const {getpoint,getAllPoint,totalpoint,gettotalpoint,listpointhistory} = require('./point_module/poin');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const routes = [    
    { // fungsi untuk melakukan registrasi pada aplikasi
        method: 'POST',
        path: '/register',
        handler: register,
        options:{
            description: 'User registration',
    notes: 'Allows users to register',
    tags: ['api'],
    validate: {
      payload: Joi.object({
        name: Joi.string().required().description('Username'),
        email: Joi.string().email().required().description('User email'),
        password: Joi.string().required().description('User password'),
        phone_number: Joi.string().required().description('User phone number'),
      }),
    },
        }
    },
    { 
        method: 'POST',
        path: '/login',
        handler: login,
        options: {
            description: 'User Login',
            notes: 'Authenticates the user and returns a login token',
            tags: ['api'], // ADD THIS TAG
            validate: {
                payload: Joi.object({
                    email: Joi.string()
                        .email()
                        .required()
                        .description('User email'),
                    password: Joi.string()
                        .required()
                        .description('User password'),
                })
            }
        },
    },
    { // fungsi untuk memanggil data nama serta email pada halaman profile
        method: 'GET',
        path: '/user',
        handler: getProfile,
        options:{
          
        }
    },
    { 
        method: 'GET',
        path: '/data',
        handler: getAllData,
        options: {
        },
    },
    { // fungsi untuk memanggil poin
        method: 'POST',
        path: '/point_record/{id}',
        handler: getpoint,
        options: {
            
        }
    },
    { // fungsi untuk memanggil poin
        method: 'GET',
        path: '/point_record',
        handler: getAllPoint,
    },
    { 
        method: 'PUT',
        path: '/totalpoint',
        handler: totalpoint,
        options: {
        },
    },
    { 
        method: 'GET',
        path: '/gettotalpoint',
        handler: gettotalpoint,
        options: {
        },
    },
    { 
        method: 'GET',
        path: '/listpointhistory',
        handler: listpointhistory,
        options: {
        },
    },
];
 
module.exports = routes;

