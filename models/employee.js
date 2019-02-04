let mongoose = required('mongoose');

// Employee Schema
let employeeSchema = mongoose.Schema({
    id:{
        type: BigInt,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    salary:{
        type: BigInt,
        required: true
    }
});

let Employee = module.exports = mongoose.model('Employee', employeeSchema);