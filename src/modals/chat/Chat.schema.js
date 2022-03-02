const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')



const ChatSchema = new Schema({
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
},
    { timestamps: true }
)

module.exports = {
    ChatSchema: mongoose.model('Chat', ChatSchema)
}