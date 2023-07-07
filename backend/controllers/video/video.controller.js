// get all videos by email

import { User } from "../../models/user.model.js"

export const getAllVideos = async (req, res) => {

    const { userId } = req.params

    const response = await User.findOneByID({ emailID })

    if (response) {
        res.status(200).json({
            videoResults: response
        })
    } else {
        throw new Error("Video not found");
        return
    }
    try {

    } catch (error) {
        res.status(500).json({
            message: "something went wrong",
            error
        })
    }
}

// post video

export const addNewVideo = async (req, res) => {
    try {
        const { email, videoLink, name, videoTitle, response } = req.body

        const record = await User.create({
            email, videoLink, name, videoTitle, response
        })

        console.log(email, videoLink, name, videoTitle, response)

        if (record) {
            res.status(201).json({
                message: "Success",
                data: record
            })
        } else {
            res.status(500).json({
                message: "error!! couldnt create",
                error: error.message
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "something went wrong",
            error
        })
    }
}