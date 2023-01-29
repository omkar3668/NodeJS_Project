const express = require ("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended:false}));

const route = require("./router")

const port = 3000;

app.use('/',route);


app.listen(port, ()=>{
    console.log(`server running on http://localhost:${port}`)
});