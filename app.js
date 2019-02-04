const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@taskapp-csx8r.mongodb.net/taskdb?retryWrites=true');
let db = mongoose.connection;

// Check connection
db.once('open', function(){
    console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function(err){
    console.log(err);
});

// Init App
const app = express();

// Bring in Models
var Employee = require('./models/employee');

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home Route
app.get('/', function(req, res){
    res.render('index');
});

// Employees list
app.get('/employees', function(req, res){
    Employee.find({}, function (err, employees) {
        if(err){
            console.log(err);
        } else {
            res.render('employees_list', {
                title: 'Employees List',
                employees: employees
            });
        }
    });
});

// Start Server
app.listen(3000, function(){
    console.log('Server started on port 3000...');
});