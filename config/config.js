const mysql = require('mysql');
const { contratos } = require('../controller/userController');
const getDbDetails = require('../controller/userController');



const db = mysql.createConnection({
    host: '52.9.145.214',
    port:'3306',
    user: 'root',
    password: 'X3ryu5IPBX.TxMT3l3c0m',
    database: 'contract'
});

db.connect(function(err) {
    if (err) throw err;
    console.log('DATABASE CONNECTED!' );
    console.log(contratos,"aqi");
 
});

const createDataDbConnection = ({ host }) => {

    var hostPart = host.split(":");
    console.log('host ',hostPart[0]);
    console.log('port ',hostPart[1]);

    const dataDbConnection = mysql.createConnection({
      host: hostPart[0],
      port:hostPart[1],
      user: 'root',
      password: 'X3ryu5IPBX.TxMT3l3c0m',
      database: 'xeryus'
    });
  
    dataDbConnection.connect();
    console.log('DATABASE 2 CONNECTED!' );
  
    return dataDbConnection;
  };
  
  module.exports = createDataDbConnection;

//async function connectToDatabase() {
//console.log(contratos);
//var n = await getDbDetails();
//console.log(n);

/*
const db2 = mysql.createConnection({
    host: n,
    port:'3306',
    user: 'root',
    password: 'X3ryu5IPBX.TxMT3l3c0m',
    database: 'xeryus'
});


db2.connect(function(err) {
    if (err) throw err;
    console.log('DATABASE2 CONNECTED!' );
});*/

//module.exports.db2 = db2;
//}
//connectToDatabase();







module.exports.db = db;


