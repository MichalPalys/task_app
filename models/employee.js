let mongoose = require('mongoose');

// Employee Schema
let employeeSchema = mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    salary:{
        type: String,
        required: true
    }
});

let Employee = module.exports = mongoose.model('Employee', employeeSchema);