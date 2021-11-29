import url from "../config/config.js"
const headers = { "Accept": "application/json", "Content-Type": "application/json" };


const listSongs = () => {
    return fetch(`${url}/api/songs`, {
        method: "GET",
        headers: headers
    }).then(response => response.json()).catch(err => console.log(err))
}

const listSongsCategorie = (categorie) => {
    return fetch(`${url}/api/songs/${categorie}`, {
        method: "GET",
        headers: headers
    }).then(response => response.json()).catch(err => console.log(err))
}

const songInfo = (id) => {
    return fetch(`${url}/api/songsInfo/${id}`, {
        method: "GET",
        headers: headers
    }).then(response => response.json()).catch(err => console.log(err))
}

const addFavorite = (id, user) => {
    return fetch(`${url}/api/songs/addFavorite/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(user)
    }).then(response => response.json()).catch(err => console.log(err))
}

const removeFavorite = (id, user) => {
    return fetch(`${url}/api/songs/removeFavorite/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(user)
    }).then(response => response.json()).catch(err => console.log(err))
}

const listFavouriteSongs = (id) => {
    return fetch(`${url}/api/songs/favourite/${id}`, {
        method: "GET",
        headers: headers
    }).then(response => response.json()).catch(err => console.log(err))
}

export { listSongs, listSongsCategorie, songInfo, addFavorite, listFavouriteSongs,removeFavorite }