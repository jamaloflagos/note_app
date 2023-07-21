const mongoose = require("mongoose")

const Schema = mongoose.Schema

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }

}, {
    timestamps: true,
    versionKey: false
})

const noteModel = mongoose.model("notes", noteSchema)

module.exports = {noteModel}