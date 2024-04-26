const myql = require('mysql2');
require('dotenv').config();

const connection = myql.createPool({
    host: 'localhost',
    database: 'applications',
    user: 'admin',
    password: '@Root2001',
});

const updatedb = async(method, data) => {

    let query = undefined;
    let values = undefined;

     switch(method) {
        case 'GET':
            query = `SELECT * FROM applications WHERE id = ${data.id}`;
            break;
        case 'PUT':
            query = "INSERT INTO applications (id, name, lastname, gender, email, phone, license) VALUES (?, ?, ?, ?, ?, ?, ?)";
            values = [data.id, data.name, data.lastname, data.gender, data.email, data.phone, data.license];
            break;
     }

     return new Promise((resolve, reject) => {

     if((query) && method == 'GET') {

        return connection.execute(query, (err, res) => {
            if(err) {
                reject(err);
            } else {
                resolve(res);
            }
        })

    } else if((query) && (values) && method == 'PUT') {

        return connection.execute(query, values, (err, res) => {
            if(err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    }        

})
}

module.exports = updatedb;
