const express = require('express')
const routerApplication = express.Router();
const dbconnection =  require('../dbconnection')


routerApplication.get('/', async(req, res) => {
    
    const objPostData = JSON.parse(req.body);

    dbconnection('GET', objPostData).catch((err) => {
        req.send(err);
    }).then((res) => {
        req.send(res);
    })
 
})

routerApplication.put('/', async (req, res) => {
    try {
        const objPostData = req.body;
        const result = await dbconnection('PUT', objPostData);
        console.log('from result', result);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send({ success: 'Your Application Has Been Submited!' });
    } catch (error) {
        console.error({ error: error });
        res.status(500).send({ error: 'Something Went Wrong On Our Servers' }); // Sending an appropriate status code with a custom error message
    }
});


module.exports = routerApplication;
