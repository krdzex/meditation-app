import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authHelper from './authHelper';

const BlockedRoute = () => {

    if (!authHelper.isAuthentcated() && !authHelper.isAuthentcatedFacebook()) {
        return <Outlet />
    } else {
        return <Navigate to="/trackLibrary/all" />
    }
}

export default BlockedRoute