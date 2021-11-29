import { Icon } from '@iconify/react';
import React from 'react';
import { Link } from 'react-router-dom';
import authHelper from '../Auth/authHelper';

const Profile = () => {
    return (
        <div className="profileWrapper">
            <div className="profileHeader">
                Profile
            </div>
            <div className="bottomPart">
                {!authHelper.isAuthentcatedFacebook() && (<Link to="/accountDetails" style={{ textDecoration: "none", color: "black" }}><div>
                    Account details
                    <Icon icon="ant-design:arrow-right-outlined" style={{ fontSize: "25px" }} />
                </div></Link>)}
                {!authHelper.isAuthentcatedFacebook() && (<Link to="/changePassword" style={{ textDecoration: "none", color: "black" }}><div>
                    Change password
                    <Icon icon="ant-design:arrow-right-outlined" style={{ fontSize: "25px" }} />
                </div></Link>)}
                <Link to="/stats" style={{ textDecoration: "none", color: "black" }}><div>
                    My Stats
                    <Icon icon="ant-design:arrow-right-outlined" style={{ fontSize: "25px" }} />
                </div></Link>
                <div onClick={() => { authHelper.signOut(); window.location.reload() }}>
                    Logout
                    <Icon icon="ant-design:arrow-right-outlined" style={{ fontSize: "25px" }} />
                </div>
            </div>
        </div>
    );
};

export default Profile;