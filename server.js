const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const dotenv = require('dotenv');
const https = require("https");
const cors = require('cors');
const fs = require('fs');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

dotenv.config();
const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    tls: {
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem')
    },
    routes: {
      cors: {
        origin: ['*'], // Set specific origin(s) instead of '*'
      },
    },
  });
  const swaggerOptions = {
    info: {
            title: 'Test API Documentation',
            version: Pack.version,
        },
    };
    await server.register([
      Inert,
      Vision,
      {
          plugin: HapiSwagger,
          options: swaggerOptions
      }
  ]);

  server.route(routes);
  try {
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
  } catch (error) {
    console.log(error)
  }
 
};

init();