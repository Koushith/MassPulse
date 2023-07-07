// get all videos by email

import { User } from "../../models/user.model.js"

export const getAllVideos = async (req, res) => {
    console.log("route was here");

    try {
        const { userId } = req.params;

        console.log("user id - email", userId);

        const response = await User.find({ email: userId });
        console.log(response)

        if (response.length > 0) {
            res.status(200).json({
                videoResults: response
            });
        } else {
            throw new Error("Video not found");
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};

// post video

// export const addNewVideo = async (req, res) => {
//     try {
//         const { email, videoLink, name, videoTitle, response } = req.body

//         const record = await User.create({
//             email, videoLink, name, videoTitle, response
//         })

//         console.log(email, videoLink, name, videoTitle, response)

//         if (record) {
//             res.status(201).json({
//                 message: "Success",
//                 data: record
//             })
//         } else {
//             res.status(500).json({
//                 message: "error!! couldnt create",
//                 error: error.message
//             })
//         }

//     } catch (error) {
//         res.status(500).json({
//             message: "something went wrong",
//             error
//         })
//     }
// }

export const addNewVideo = async (req, res) => {
    try {
        const { email, videoLink, name, videoTitle, response } = req.body;
        console.log(email, videoLink, name, videoTitle, response)
        const record = await User.create({
            email,
            videoLink,
            name,
            videoTitle,
            response
        });

        console.log(email, videoLink, name, videoTitle, response);

        if (record) {
            res.status(201).json({
                message: "Success",
                data: record
            });
        } else {
            res.status(500).json({
                message: "Error!! Could not create the record"
            });
        }
    } catch (error) {
        if (error.name === "MongoError" && error.code === 11000) {
            res.status(409).json({
                message: "Duplicate email",
                error: error.keyValue
            });
        } else {
            res.status(500).json({
                message: "Something went wrong",
                error
            });
        }
    }
};

