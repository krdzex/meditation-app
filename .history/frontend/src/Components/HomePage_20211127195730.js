import React from 'react';

const HomePage = () => {
    return (
        <div className="homePage">
            <img src={process.env.PUBLIC_URL + `/images/home.jpg`}></img>
        </div>
    );
};

export default HomePage;