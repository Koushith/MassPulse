import express from "express";
import connectDB from "./utils/db.js";
import cors from "cors";
import {
    addNewVideo,
    getAllVideos,
    getPreviousResponseById,
    updateResponse,
} from "./controllers/video/video.controller.js";

const PORT = process.env.PORT || 8000;
const app = express();

const corsConfig = {
    origin: [
        "https://masspulse.xyz",
        "http://localhost:3000",
        "http://localhost:8000",
    ],
};

app.use(cors(corsConfig));
app.use(express.json());
connectDB();

app.get("/video/:userId", getAllVideos);
app.post("/video", addNewVideo);
app.post("/video/update", updateResponse);
app.get("/video/search/:videoId", getPreviousResponseById);
app.get("/", (_, res) => {
    res.send("This Route works!!");
});

app.listen(PORT, () => {
    console.log(`App is runing on the Port--${PORT}`);
});
