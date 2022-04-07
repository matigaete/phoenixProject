const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname+'/phoenixProject'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/phoenixProject/index.html'));
});

app.listen(process.env.PORT || 5000);