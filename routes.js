const {getProfile,getAllData,login,register} = require('./autentication authorization/auth');
const {getpoint,getAllPoint,totalpoint,gettotalpoint,listpointhistory} = require('./point_module/poin');

const routes = [
    { // fungsi untuk melakukan registrasi pada aplikasi
        method: 'POST',
        path: '/register',
        handler: register,
    },
    { 
        method: 'POST',
        path: '/login',
        handler: login,
        options: {
        },
    },
    { // fungsi untuk memanggil data nama serta email pada halaman profile
        method: 'GET',
        path: '/user',
        handler: getProfile,
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

