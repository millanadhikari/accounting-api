const mongoose = require('mongoose')
const Schema = mongoose.Schema



const ResetPinSchema = new Schema({
    pin: {
        type: String,
        maxlength: 6,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
       
    },
    addedAt: {
        type: Date,
        required: true,
        default: Date.now(),
      }

})

module.exports = {
    ResetPinSchema: mongoose.model('ResetPin', ResetPinSchema)
}