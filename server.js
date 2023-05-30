const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const dotenv = require('dotenv');

dotenv.config();
const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    //tls:options,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);
  try {
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
  } catch (error) {
    console.log(error)
  }
 
};

init();