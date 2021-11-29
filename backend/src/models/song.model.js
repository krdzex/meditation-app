import mongoose from "mongoose"

const SongSchema = new mongoose.Schema({
    songName: { type: String },
    songTitle: {
        type: String
    },
    image: {
        type: String
    },
    length: {
        type: String,
    },
    categorie: { type: String },
    favourite: [{ type: String }]
})
export default mongoose.model("Song", SongSchema)


