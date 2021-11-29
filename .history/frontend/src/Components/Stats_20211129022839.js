import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { listFavouriteSongs } from '../ApiService/songApi';
import { userInfo } from '../ApiService/userApi';
import authHelper from '../Auth/authHelper';

const Stats = () => {

    const [allTime, setAllTime] = useState(0)
    const [currentSessionTime, setCurrentSessionTime] = useState(0)
    const [likedSounds, setLikedSounds] = useState(0)
    useEffect(async () => {
        const onStart = async () => {
        let currentSession = sessionStorage.getItem("sessionMeditationTime")
        if (authHelper.isAuthentcated()) {
            let time = await userInfo(authHelper.isAuthentcated().user._id);
            setAllTime(Math.floor(time.allSessionsTime / 60))
        }
        setCurrentSessionTime(Math.floor(currentSession / 60))
        let favouriteSongs = await listFavouriteSongs(authHelper.isAuthentcated() ? authHelper.isAuthentcated().user._id : authHelper.isAuthentcatedFacebook().id)
        setLikedSounds(favouriteSongs.length)
    }, [])

    return (
        <div className="cardWrapper">
            <div className="card">
                <div className="icon">
                    <Icon icon="carbon:time" />
                </div>
                <div className="content">
                    <h2>Current Session Time</h2>
                    <span>{currentSessionTime}min</span>
                </div>
            </div>
            {!authHelper.isAuthentcatedFacebook() && (<div className="card">
                <div className="icon">
                    <Icon icon="carbon:time" />
                </div>
                <div className="content">
                    <h2>Total session time</h2>
                    <span>{allTime}min</span>
                </div>
            </div>)}
            <div className="card">
                <div className="icon">
                    <Icon icon="ant-design:heart-filled" />
                </div>
                <div className="content">
                    <h2>Total liked songs</h2>
                    <span>{likedSounds}</span>
                </div>
            </div>
        </div>
    );
};

export default Stats;