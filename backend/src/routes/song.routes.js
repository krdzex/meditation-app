import express from "express";
import songController from "../controller/songs.controller";
const router = express.Router()


router.route("/api/songs").get(songController.listSongs)
router.route("/api/songs/:categorie").get(songController.listSongsCategorie)
router.route("/api/songsInfo/:id").get(songController.songInfo)
router.route("/api/songs/addFavorite/:id").put(songController.addFavorite)
router.route("/api/songs/removeFavorite/:id").put(songController.removeFavorite)
router.route("/api/songs/favourite/:id").get(songController.favouriteSongs)
export default router;