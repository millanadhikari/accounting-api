const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')



const CustomerSchema = new Schema({
 
    clientId:{
        type: Schema.Types.ObjectId,
        

    },
    name: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        default:0,
        validate(value) {
            if (value = 0) {
                throw new Error('Phone number is not valid')

            }
        }
    }, 
    addedAt: {
        type: Date,
        required: true,
        default: Date.now(),
    }
})

module.exports = {
    CustomerSchema:mongoose.model('Customer', CustomerSchema)
}