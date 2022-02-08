//var express = require('express')
let express = require("express");
let app = express();

let http = require('http').createServer(app);
let io = require('socket.io')(http);
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

var port = process.env.PORT || 8080;

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());

const dummyComment={
    name:'Samhitha',
    description:'New html page'
}
let dummyData=[dummyComment,dummyComment]

//serve comments data to the requestor
app.get('/api/comments',(req,res)=>{
    console.log('commentsrequested')
    getComments(res)
})

app.post('/api/comments',(req,res)=>{
    console.log('New Comment posted')
    console.log('body',req.body)
    let comment = req.body;
    insertComment(comment,res)
})

io.on('connection', (socket)=>{
    console.log('a user connected');
    socket.on('disconnect',()=>{
        console.log('user disconnected');
    });
    setInterval(()=>{
        socket.emit('number',parseInt(Math.random()*10));
    },1000);
});


//Data base Connection
const uri = "mongodb+srv://smakham:Mongodb@21@cluster0.2mbxz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});


let commentsCollection;

//this function is used to open the connection
const openConnection = (message)=> {
    client.connect((err,db) => {
        commentsCollection = client.db("clientComments").collection("comments");
        if(!err){
            console.log('Database Connected')
        }
        else{
            console.log('error in if',err)
        }
    });
}

//insert comment into the db
const insertComment = (comment,res)=>{
    //insert into collection
    commentsCollection.insertOne(comment,(err,result)=>{
        console.log('Comment Inserted',result)
        res.send({result:200})
    })
}

//retrieve all comments
const getComments=(res)=>{
    commentsCollection.find({}).toArray(function(err,result){
        if(err) throw err;
        res.send(result)
    })
}

openConnection()

http.listen(port,()=>{
    console.log("listening on port",port);
});