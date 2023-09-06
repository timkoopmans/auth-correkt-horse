import './App.css';
import { useAuthUser } from "@frontegg/react";
import { ContextHolder } from '@frontegg/rest-api';
import React, { useState, useEffect } from 'react';

function createRandomString(length = 16) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digestBuffer = await crypto.subtle.digest('SHA-256', data);

    const array = Array.from(new Uint8Array(digestBuffer));
    const base64 = btoa(String.fromCharCode(...array));

    return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function App() {
    const [getCookieValue, setCookieValue] = useState(null);

    console.log("base URL: " + ContextHolder.getContext().baseUrl);

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

        const code_verifier = createRandomString();
        generateCodeChallenge(code_verifier)
            .then(code_challenge => {
                // Construct the final URL
                const finalRedirectUri = `${decodedRedirectUri}?${decodedExtraParams.substring(1)}&code=${code_challenge}`;

                // Redirect the user to the specified URI
                window.location.href = finalRedirectUri;
            })
            .catch(error => {
                console.error('Error:', error);
            });

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