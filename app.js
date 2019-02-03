const express = require('express');

// Init App
const app = express();

// Home Route
app.get('/', function(req, res){
    res.send('it`s work');
});

// Start Server
app.listen(3000, function(){
    console.log('Server started on port 3000...');
});