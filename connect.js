require('dotenv').config();
const mysql = require('mysql2/promise');

const conPool = mysql.createPool({

    host: process.env.DB_HOST,

    user: process.env.DB_USER,

    password: process.env.DB_PASS,

    database: process.env.DB_NAME,

    connectionLimit: 10

})



module.exports = {conPool};

async function calldata(){

    const [data] = await conPool.query('select * from tickets')

    console.log(data)

}

calldata();