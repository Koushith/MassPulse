import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {

        type: String
    },
    videoTitle: {
        type: String,

    },
    videoLink: {
        type: String
    },
    response: {
        type: String
    }
})

export const User = mongoose.model("User", userSchema)
