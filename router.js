const express = require("express");
const route = express.Router();
const accounts= require("./database");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

route.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
})

route.get('/browse',(req,res)=>{
    res.sendFile(__dirname + '/browse.html');
})
route.get('/register',(req,res)=>{
    res.sendFile(__dirname + '/register.html');
})
route.get('/contact',(req,res)=>{
    res.sendFile(__dirname + '/contact.html');
})

const swaggerOptions ={
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Account API",
            description: "Account API Information",
            contact: {
              name: "Account Info"
            },
            servers: ["http://localhost:3000"]
          }
    },
    apis: ["router.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
route.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//swagger
/**
 * @swagger
 * /accounts:
 *  get:
 *    description: Use to request all accounts
 *    responses:
 *      '200':
 *        description: A successful response
 */
// get request
route.get('/accounts',(req,res)=>{
    res.json({userData:accounts});
});

route.post('/accounts',(req,res)=>{
    const incomingAccount = req.body
    accounts.push(incomingAccount);
    res.json(accounts);
});

route.get('/accounts/:id',(req,res)=>{
    const accountid = Number(req.params.id);
    const getAccount = accounts.find((account)=>account.id === accountid)
    if(!getAccount){
          res.status(500).send("Account not found");
    }else{
         res.json({userData:[getAccount]});
    }
});

/**
 * @swagger
 * /customers:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
route.get("/customers", (req, res) => {
    res.status(200).send("Customer results");
  });
  
/**
 * @swagger
 * /customer:
 *  put:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
route.put("/customer", (req, res) => {
    res.status(200).send("Successfully updated customer");
  });


route.get('*',(req,res)=>{
    res.send('sorry this is invalid url');
})

module.exports =route;