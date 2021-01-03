const express = require('express');
const cors = require('cors');
const dbConnection = require('./db');
const app = express();

app.use(cors());
app.use(express.json());


app.get('/users',(req,res,next) => {
    dbConnection.query('SELECT * from users',(err,result) => {
        if(err){
            throw err;
        }
        else{
            res.send(result);
        }
    });
});

app.get('/check/:username',(req,res,next) => {
    const username = req.params.username;

    dbConnection.query('SELECT * from users WHERE username = ?',[username],(err,result) => {
        if(err){
            throw err;
        }
        else{
            res.send(result);
        }
    });
});

app.post('/register',(req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;

    dbConnection.query("INSERT INTO users (username,password) VALUES(?,?)",[username,password],(err,result) => {
        if(err){
            throw err;
        }
        else{
            res.send(result);
            console.log(username + " created!");
        }
    })
});

app.post('/login',(req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;

    dbConnection.query("SELECT * from users WHERE username = ? AND password = ?",[username,password],(err,result) => {
        if(err){
            res.send({err : err});
        }
        if(result.length > 0){
            res.send(result);
            console.log(req.hostname + " login!");
        }
        else{
            res.status(401);
            res.send("Incorrect username or password");
            console.log(req.hostname + " login fail");
        }
    })
});

app.listen(3001, () => console.log("Server is running at port 3001"))