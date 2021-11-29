import { Icon } from '@iconify/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import authHelper from '../Auth/authHelper';


const Header = () => {
    const logged = useSelector(state => state.loginReducer)
    return (
        <div className="headerWrapper">
            <Link to="/"><div className="leftSide">
                <h2>Meditation app</h2>
            </div></Link>

            <div className="rightSide">
                <div className="navigation" style={authHelper.isAuthentcated() || logged ? { marginRight: "50px" } : {}}>
                    {authHelper.isAuthentcated() || logged || authHelper.isAuthentcatedFacebook() ?
                        <ul>
                            <li><Link to="/trackLibrary/all">All</Link></li>
                            <li><Link to="/trackLibrary/my">My</Link></li>
                            <li><Link to="/trackLibrary/beginners">Beginners</Link></li>
                            <li><Link to="/trackLibrary/stressRelief">Stress Relief</Link></li>
                            <li><Link to="/trackLibrary/happiness">Happiness</Link></li>
                            <li><Link to="/trackLibrary/sleep">Sleep</Link></li>
                            <li><Link to="/trackLibrary/walkingMeditation">Walking meditation</Link></li>
                            <li><Link to="/trackLibrary/relaxation">Relaxation</Link></li>
                        </ul>
                        : <ul >
                            <li>
                                <Link to="/about">
                                    How it works
                                </Link>
                            </li>
                            <li>
                                <Link to="/signUp">
                                    Sign up
                                </Link>
                            </li>
                            <li>
                                <Link to="/signIn">
                                    Sign in
                                </Link>
                            </li>
                        </ul>}
                </div>
                <div className="navigationLogin">
                    {authHelper.isAuthentcated() || logged || authHelper.isAuthentcatedFacebook() ?
                        <Link to="/profile"><div style={{ cursor: "pointer", fontSize: "45px", lineHeight: "0.5" }}>
                            <Icon icon="bi:person-bounding-box" />
                        </div></Link> : ""}
                </div>
            </div>
        </div>
    );
};

export default Header;