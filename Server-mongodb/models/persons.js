const mongoose = require('mongoose')



const personsSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },


    userid: {
        type: String,
        required: true
    }
  
 

})


module.exports = mongoose.model('persons', personsSchema)