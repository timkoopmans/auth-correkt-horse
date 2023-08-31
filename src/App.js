import './App.css';
import { useAuthUser } from "@frontegg/react";
import React, { useState, useEffect } from 'react';

function App() {
    const [getCookieValue, setCookieValue] = useState(null);

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

    let loginOrigin = getCookieValue;
    if (loginOrigin) {
        console.log('got loginOrigin', loginOrigin);
    }

    console.log('user', user);

    // TODO: add some logic here to prevent open redirects vulnerabilities, maybe an allow list
    const match = window.location.href.match(/redirect_uri=([^&]*)(.*)/);
    if (match && match[1]) {
        const redirectUri = match[1]; // The actual redirect URL
        const extraParams = match[2]; // Extra params after redirect URL

        // Decode the URI and extraParams
        const decodedRedirectUri = decodeURIComponent(redirectUri);
        const decodedExtraParams = decodeURIComponent(extraParams);

        // Construct the final URL
        const finalRedirectUri = `${decodedRedirectUri}?${decodedExtraParams.substring(1)}&code=${user?.id}}`;

        // Redirect the user to the specified URI
        window.location.href = finalRedirectUri;
        return;
    }

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