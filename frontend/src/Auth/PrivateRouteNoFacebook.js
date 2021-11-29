import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authHelper from './authHelper';

const PrivateRouteNoFacebook = () => {
    if (authHelper.isAuthentcated()) {
        return <Outlet />
    } else if (authHelper.isAuthentcatedFacebook()) {
        return <Navigate to="/trackLibrary/all" />
    }
    return <Navigate to="/signIn" />;
};

export default PrivateRouteNoFacebook;