import React from 'react';
import { Route, Routes } from 'react-router';
import BlockedRoute from './Auth/BlockedRoute';
import PrivateRoute from './Auth/PrivateRoute';
import PrivateRouteNoFacebook from './Auth/PrivateRouteNoFacebook';
import About from './Components/About';
import EditPassword from './Components/EditPassword';
import EditProfile from './Components/EditProfile';
import Header from './Components/Header';
import HomePage from './Components/HomePage';
import Meditation from './Components/Meditation';
import Profile from './Components/Profile';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Stats from './Components/Stats';
import TrackLibraryScreen from './Components/TrackLibraryScreen';

const MainRouter = () => {



    return (
        <div>
            <Header />
            <div className="mainRouterWrapper">
                <Routes>
                    <Route exact path="/about" element={<About />} />
                    <Route exact path="/" element={<HomePage />} />

                    <Route path="/signIn" element={<BlockedRoute />}>
                        <Route path="" element={<SignIn />} />
                    </Route>

                    <Route path="/signUp" element={<BlockedRoute />}>
                        <Route path="" element={<SignUp />} />
                    </Route>

                    <Route path="/profile" element={<PrivateRoute />}>
                        <Route path="" element={<Profile />} />
                    </Route>

                    <Route path="/" element={<PrivateRouteNoFacebook />}>
                        <Route path="changePassword" element={<EditPassword />} />
                        <Route path="accountDetails" element={<EditProfile />} />
                    </Route>

                    <Route path="/meditation/:id" element={<PrivateRoute />}>
                        <Route path="" element={<Meditation />} />
                    </Route>

                    <Route path="/stats" element={<PrivateRoute />}>
                        <Route path="" element={<Stats />} />
                    </Route>

                    <Route path="/trackLibrary/:categorie" element={<PrivateRoute />}>
                        <Route path="" element={<TrackLibraryScreen />} />
                    </Route>

                </Routes>
            </div>
        </div>

    );
};

export default MainRouter;