require('dotenv').config();
const mysql = require('mysql2/promise');

const conPool = mysql.createPool({

    host: process.env.DB_HOST || '127.0.0.1',

    user: process.env.DB_USER || 'root',

    password: process.env.DB_PASS,

    database: process.env.DB_NAME,

    connectionLimit: 10

})



module.exports = {conPool};

// async function calldata(){

//     const [data] = await conPool.query('select * from tickets')

//     console.log(data)

// }

// calldata();