const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Home Route
app.get('/', function(req, res){
    res.render('index');
});

// Add Route
app.get('/employees/add', function(req, res){
    res.render('add_employee', {
        title:'Add Employee'
    });
});

// Add Submit POST Route
app.post('/employees/add', function(req, res) {
    let employee = new Employee();
    employee.id = req.body.id;
    employee.name = req.body.name;
    employee.salary = req.body.salary;

    employee.save(function(err){
        if (err) {
            console.log(err);
            return
        } else {
            res.redirect('/');
        }
    });
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