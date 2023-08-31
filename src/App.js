import './App.css';
import { useAuthUser } from "@frontegg/react";
import React, { useState, useEffect } from 'react';

function App() {
    const [getCookieValue, setCookieValue] = useState(null);

    useEffect(() => {
        // Function to get query parameters
        const getQueryParam = (name, url = window.location.href) => {
            name = name.replace(/[\[\]]/g, '\\$&');
            const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
            const results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        };

        // Get the redirect_uri query parameter if present
        const redirectUri = getQueryParam('redirect_uri');

        if (redirectUri) {
            // Redirect the user to the specified URI
            // TODO: add some logic here to prevent open redirects vulnerabilities
            window.location.href = redirectUri;
            return;
        }

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

    let loginOrigin = getCookieValue;
    if (loginOrigin) {
        console.log('got loginOrigin', loginOrigin);
    }

    console.log('user', user);

    if (user?.id && loginOrigin) {
        console.log('redirecting to', loginOrigin);
        window.location.href = "https://" + loginOrigin;
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
        </div>
    );
}

export default App;