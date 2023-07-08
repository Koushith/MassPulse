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
        console.log("route was here")
        const { email, videoLink, name, videoTitle, videoId } = req.body;
        console.log(email, videoLink, name, videoTitle, videoId);



        const record = await User.create({
            email,
            videoLink,
            name,
            videoTitle,
            videoId
        });


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

        res.status(500).json({
            message: "Something went wrong",
            error
        });
    }
}



export const updateResponse = async (req, res) => {
    try {
        const { videoId, response } = req.body;

        const findVideo = await User.findOneAndUpdate({ videoId }, {
            response
        })

        console.log("find videooo---", findVideo)

        if (findVideo) {
            res.status(200).json({
                message: "Response updated",
                data: findVideo
            })
        } else {
            throw new Error("Something went wrong.. couldnt update")
            return
        }



    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error
        });
    }
}



export const getPreviousResponseById = async (req, res) => {

    try {
        const { videoId } = req.params
        console.log("route was hete ate get video by id route")
        const query = await User.find({ videoId: videoId })

        console.log("found video by id", query.map(res => res.response).filter((res) => res !== undefined))
        console.log("query".query)
        const filteredRes = query.map(res => res.response).filter((res) => res !== undefined)
        res.status(200).json({
            message: "video found-",
            video: filteredRes,
            query
        })

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}