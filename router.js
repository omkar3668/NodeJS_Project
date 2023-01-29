const express = require("express");
const route = express.Router();
const accounts= require("./database");

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

// get request
route.get('/accounts',(req,res)=>{
    res.json({userData:accounts});
});

//post request
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

route.get('*',(req,res)=>{
    res.send('sorry this is invalid url');
})

module.exports =route;