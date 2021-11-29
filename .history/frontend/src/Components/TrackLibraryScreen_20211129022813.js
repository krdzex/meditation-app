import React, { useEffect, useState } from 'react';
import { listFavouriteSongs, listSongs, listSongsCategorie } from '../ApiService/songApi';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import authHelper from '../Auth/authHelper';

const TrackLibraryScreen = () => {


    const { categorie } = useParams();
    const [fiveMinSongs, setFiveMinSongs] = useState([])
    const [tenMinSongs, setTenMinSongs] = useState([])
    const [fifteenMinSongs, setFifteenMinSongs] = useState([])
    const [twentyMinSongs, setTwentyMinSongs] = useState([])
    const [twentyFiveMinSongs, setTwentyFiveMinSongs] = useState([])
    const [sixtyMinSongs, setSixtyMinSongs] = useState([])

    useEffect( () => {
        const onStart = async () => {
            setFiveMinSongs([])
            setTenMinSongs([])
            setFifteenMinSongs([])
            setTwentyMinSongs([])
            setTwentyFiveMinSongs([])
            setSixtyMinSongs([])


            if (categorie === "all") {
                let songs = await listSongs()
                for (let i = 0; i < songs.length; i++) {
                    addingSongs(songs[i])
                }
            } else if (categorie === "my") {

                let songs = await listFavouriteSongs(authHelper.isAuthentcated() ? authHelper.isAuthentcated().user._id : authHelper.isAuthentcatedFacebook().id)
                for (let i = 0; i < songs.length; i++) {
                    addingSongs(songs[i])
                }
            } else {
                let songs = await listSongsCategorie(categorie)
                for (let i = 0; i < songs.length; i++) {
                    addingSongs(songs[i])
                }

            }
        }
        onStart()
    }, [categorie])

    const addingSongs = (song) => {
        switch (song.length) {
            case "5": {
                setFiveMinSongs(previousState => ([...previousState, song]));
                break;
            }
            case "10": {
                setTenMinSongs(previousState => ([...previousState, song]));
                break;
            }
            case "15": {
                setFifteenMinSongs(previousState => ([...previousState, song]));
                break;
            }
            case "20": {
                setTwentyMinSongs(previousState => ([...previousState, song]));
                break;
            }
            case "25": {
                setTwentyFiveMinSongs(previousState => ([...previousState, song]));
                break;
            }
            case "60": {
                setSixtyMinSongs(previousState => ([...previousState, song]));
                break;
            }
            default:{
                return undefined
            }
        }
    }
    return (
        <div className="libraryWrapper">
            {fiveMinSongs.length > 0 && (<div className="rowWrapper">
                <div className="title">
                    5 mins
                </div>
                <div className="grid">
                    {fiveMinSongs.map((song, id) => (
                        <Link to={`/meditation/${song._id}`} key={id}><div className="singleSong" >
                            <div className="img">
                                <img src={process.env.PUBLIC_URL + `/images/${song.image}`} alt="img"></img>
                            </div>
                            <div className="titleSong">
                                {song.songName}
                            </div>
                        </div></Link>))}
                </div>
            </div>)}
            {tenMinSongs.length > 0 && (<div className="rowWrapper">
                <div className="title">
                    10 mins
                </div>
                <div className="grid">
                    {tenMinSongs.map((song, id) => (
                        <Link to={`/meditation/${song._id}`} key={id}><div className="singleSong" >
                            <div className="img">
                                <img src={process.env.PUBLIC_URL + `/images/${song.image}`} alt="img"></img>
                            </div>
                            <div className="titleSong">
                                {song.songName}
                            </div>
                        </div></Link>))}
                </div>
            </div>)}
            {fifteenMinSongs.length > 0 && (<div className="rowWrapper">
                <div className="title">
                    15 mins
                </div>
                <div className="grid">
                    {fifteenMinSongs.map((song, id) => (
                        <Link to={`/meditation/${song._id}`} key={id}><div className="singleSong" >
                            <div className="img">
                                <img src={process.env.PUBLIC_URL + `/images/${song.image}`} alt="img"></img>
                            </div>
                            <div className="titleSong">
                                {song.songName}
                            </div>
                        </div></Link>))}
                </div>
            </div>)}
            {twentyMinSongs.length > 0 && (<div className="rowWrapper">
                <div className="title">
                    20 mins
                </div>
                <div className="grid">
                    {twentyMinSongs.map((song, id) => (
                        <Link to={`/meditation/${song._id}`} key={id}><div className="singleSong" >
                            <div className="img">
                                <img src={process.env.PUBLIC_URL + `/images/${song.image}`} alt="img"></img>
                            </div>
                            <div className="titleSong">
                                {song.songName}
                            </div>
                        </div></Link>))}
                </div>
            </div>)}
            {twentyFiveMinSongs.length > 0 && (<div className="rowWrapper">
                <div className="title">
                    25 mins
                </div>
                <div className="grid">
                    {twentyFiveMinSongs.map((song, id) => (
                        <Link to={`/meditation/${song._id}`} key={id}><div className="singleSong" >
                            <div className="img">
                                <img src={process.env.PUBLIC_URL + `/images/${song.image}`} alt="img"></img>
                            </div>
                            <div className="titleSong">
                                {song.songName}
                            </div>
                        </div></Link>))}
                </div>
            </div>)}
            {sixtyMinSongs.length > 0 && (<div className="rowWrapper">
                <div className="title">
                    60 mins
                </div>
                <div className="grid">
                    {sixtyMinSongs.map((song, id) => (
                        <Link to={`/meditation/${song._id}`} key={id}><div className="singleSong" >
                            <div className="img">
                                <img src={process.env.PUBLIC_URL + `/images/${song.image}`} alt="img"></img>
                            </div>
                            <div className="titleSong">
                                {song.songName}
                            </div>
                        </div></Link>))}
                </div>
            </div>)}

        </div>
    );
};

export default TrackLibraryScreen;