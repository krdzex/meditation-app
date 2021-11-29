import Song from "../models/song.model"

const listSongs = (req, res) => {
    Song.find((err, songs) => {
        res.status(200).json(songs)
    })
}


const listSongsCategorie = (req, res) => {
    let categorie = req.params.categorie
    Song.find(({ "categorie": categorie }), (err, songs) => {
        res.status(200).json(songs)
    })
}

const songInfo = (req, res) => {
    let id = req.params.id
    Song.findById(id).exec((err, songs) => {
        res.status(200).json(songs)
    })
}

const addFavorite = async (req, res) => {
    let id = req.params.id
    let song = await Song.findById(id);
    song.favourite.push(req.body.userId)
    song.save();
    res.json({ message: "Added" });
}

const removeFavorite = async (req, res) => {
    let id = req.params.id
    let song = await Song.findById(id);

    for (var i = 0; i < song.favourite.length; i++) {
        if (song.favourite[i] === req.body.userId) {
            song.favourite.splice(i, 1);
        }
        song.save();
        res.json({ message: "Deleted" });
    }
}

const favouriteSongs = (req, res) => {
    let id = req.params.id
    Song.find({ favourite: id }).exec((err, songs) => {
        res.status(200).json(songs)
    })
}




export default { listSongs, listSongsCategorie, songInfo, addFavorite, favouriteSongs,removeFavorite }