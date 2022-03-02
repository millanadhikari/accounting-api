const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')



const MessageSchema = new Schema({

    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
},
    { timestamps: true }
)

module.exports = {
    MessageSchema: mongoose.model('Message', MessageSchema)
}