import { Icon } from '@iconify/react';
import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { addFavorite, removeFavorite, songInfo } from '../ApiService/songApi';
import { updateTime, userInfo } from '../ApiService/userApi';
import authHelper from '../Auth/authHelper';
const Meditation = () => {

    const { id } = useParams();
    const [play, setPlay] = useState(false)
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0)
    const audioPlayer = useRef();
    const progressBar = useRef();
    const animationRef = useRef();
    const allTimesTimerRef = useRef(1)
    const sessionTimerRef = useRef(1)
    const [like, setLike] = useState(false)

    const [songInformations, setSongInformations] = useState({})
    useEffect(() => {
        songInfo(id).then(res => {
            setSongInformations(res)
            if (res.favourite.includes(authHelper.isAuthentcated() ? authHelper.isAuthentcated().user._id : authHelper.isAuthentcatedFacebook().id)) {
                setLike(true)
            } else {
                setLike(false)
            }
        }).catch(err => console.log(err))
        if (!authHelper.isAuthentcatedFacebook()) {
            userInfo(authHelper.isAuthentcated().user._id).then(res => allTimesTimerRef.current = parseInt(res.allSessionsTime) + 1).catch(err => console.log(err))
        }
        let sessionTimeInfo = sessionStorage.getItem("sessionMeditationTime")
        if (sessionTimeInfo !== null) {
            sessionTimerRef.current = parseInt(sessionTimeInfo) + 1
        }
        return () => {
            if (!authHelper.isAuthentcatedFacebook()) {
                updateTime(authHelper.isAuthentcated().user._id, allTimesTimerRef.current).then(res => console.log(res)).catch(err => console.log(err))
            }
            sessionStorage.setItem("sessionMeditationTime", sessionTimerRef.current);
        }
    }, [])
    
    const onLoadedMetadata = () => {
        const seconds = Math.floor(audioPlayer.current.duration)
        progressBar.current.max = seconds;
        setDuration(seconds)
    }

    const onPlayClick = () => {
        setPlay(true);
        audioPlayer.current.play()
        animationRef.current = requestAnimationFrame(whilePlaying)
        setInterval(() => {
            allTimesTimerRef.current += 1;
            sessionTimerRef.current += 1;
        }, 1000)
    }
    const onPauseClick = () => {
        setPlay(false);
        audioPlayer.current.pause()
        cancelAnimationFrame(animationRef.current)
        for (let i = 0; i < 9999; i++) {
            window.clearInterval(i);
        }
    }


    const onRestartClick = () => {

        setPlay(false);
        audioPlayer.current.currentTime = 0;
        progressBar.current.value = audioPlayer.current.currentTime;
        progressBar.current.style.setProperty("--seek-before-width", `${progressBar.current.value / duration * 100}%`)
        audioPlayer.current.pause()
        setCurrentTime(progressBar.current.value)
        cancelAnimationFrame(animationRef.current)
        for (let i = 0; i < 9999; i++) {
            window.clearInterval(i);
        }

    }


    const whilePlaying = () => {
        if (audioPlayer.current !== null) {
            progressBar.current.value = audioPlayer.current.currentTime;
            progressBar.current.style.setProperty("--seek-before-width", `${progressBar.current.value / duration * 100}%`)
            setCurrentTime(progressBar.current.value)
            animationRef.current = requestAnimationFrame(whilePlaying)
        }

    }

    const calculateTime = (seconds) => {
        const minutes = Math.floor(seconds / 60)
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const sacondsInfo = Math.floor(seconds % 60);
        const returnedSeconds = sacondsInfo < 10 ? `0${sacondsInfo}` : `${sacondsInfo}`;
        return `${returnedMinutes}:${returnedSeconds}`
    }

    const onHeartClick = () => {
        if (!like) {
            setLike(true)
            addFavorite(id, { userId: authHelper.isAuthentcated() ? authHelper.isAuthentcated().user._id : authHelper.isAuthentcatedFacebook().id }).then(res => console.log(res)).catch(err => console.log(err))
        } else {
            setLike(false)
            removeFavorite(id, { userId: authHelper.isAuthentcated() ? authHelper.isAuthentcated().user._id : authHelper.isAuthentcatedFacebook().id }).then(res => console.log(res)).catch(err => console.log(err))
        }
    }
    return (
        <div className="meditationWrapper">
            <audio ref={audioPlayer}
                src={process.env.PUBLIC_URL + `/songs/${songInformations.songTitle}`} preload="metadata" onLoadedMetadata={onLoadedMetadata}>
            </audio>
            <div className="circle">
                <img src={process.env.PUBLIC_URL + `/images/${songInformations.image}`} alt="img"></img>
                <button >{!play ? <Icon icon="carbon:play-filled-alt" className="realIcon" onClick={() => onPlayClick()} /> : <div><Icon icon="el:repeat" style={{ marginRight: "15px", fontSize: "65px" }} onClick={() => onRestartClick()} /><Icon icon="clarity:pause-solid" className="realIcon" onClick={() => onPauseClick()} /></div>}</button>
            </div>
            <div className="inRow">
                    <div style={{ marginRight: "5px", color: "white" }}>{calculateTime(currentTime)}</div>
                    <input type="range" className="progressBar" defaultValue="0" ref={progressBar} />
                    <div style={{ marginLeft: "5px", color: "white" }}>{calculateTime(duration)}</div>
                </div>
            <div className="title">{songInformations.songName}</div>
            <div className="heart"><Icon icon="ci:heart-fill" className="realIcon" onClick={() => onHeartClick()} style={like ? { color: "red" } : {}} /></div>
        </div>
    );
};

export default Meditation;