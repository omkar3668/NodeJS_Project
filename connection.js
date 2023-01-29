const mongoose=require('mongoose');
const express=require('express');

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mynewdb",{
    useNewUrlParser:true, useUnifiedTopology:true
}, (err)=>{
    if(err){
   console.log(err)
}else{
    console.log("successfully connected")
}
})

//schema
const schema={
    id:Number,
    username:String
}

const monmodel = mongoose.model("NEWCOL",schema);

//post

app.post("/post",async(req,res)=>{
    console.log("inside post function");

    const data = new monmodel({
        username:req.body.username,
        id:req.body.id
    });

    const val =await data.save();
    res.send("posted");
})


// GET

app.get('/fetch/:id',function(req,res){
    fetchid= req.params.id;
    monmodel.find(({id:fetchid}),function(err,val){
        if(err){
            res.send("error");
        }else{
        if (val.length==0){
            res.send('data does not exists');
        }else{
        res.send(val);
    }
}
    })
})



app.listen(4002,()=>{
    console.log("on port No 4002 !")
})
