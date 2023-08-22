import './App.css';
import { useAuthUser } from "@frontegg/react";
import React, { useState, useEffect } from 'react';

function App() {
    const [cookieValue, setCookieValue] = useState(null);

    useEffect(() => {
        // On component mount, read the cookie value
        const value = getCookie("loginOrigin");
        setCookieValue(value);
    }, []);

    const getCookie = (name) => {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    };

    const user = useAuthUser();
    console.log('user', user);
    const logout = () => {
        window.location.href = `${window.location}account/logout`;
    }

    let redirectUrl = new URLSearchParams(window.location.search).get('redirectUrl');
    if (redirectUrl) {
        console.log('got redirectUrl', redirectUrl);
        localStorage.setItem('redirectUrl', redirectUrl);
    }

    let loginOrigin = cookieValue;
    if (loginOrigin) {
        console.log('got loginOrigin', loginOrigin);
        localStorage.setItem('redirectUrl', loginOrigin);
    }

    console.log('user', user);
    console.log('localStorage', localStorage);

    redirectUrl = localStorage.getItem('redirectUrl');

    if (user?.id &&  redirectUrl) {
        localStorage.removeItem('redirectUrl');
        console.log('redirecting to', redirectUrl);
        window.location.href = redirectUrl;
        return null;
    }

    return (
        <div className="App">
            <div className="profile-section">
                <img className="profile-pic" src={user?.profilePictureUrl} alt={user?.name} />
                <p className="profile-name">{user?.name}</p>
            </div>
            <div className="logout-section">
                <button className="logout-button" onClick={() => logout()}>Logout</button>
            </div>
            <p>Value of 'loginOrigin' cookie: {cookieValue}</p>
        </div>
    );
}

export default App;