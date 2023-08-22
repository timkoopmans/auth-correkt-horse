import './App.css';
import {useAuth} from "@frontegg/react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function LogoutRoute() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    logout();
    navigate('/');
    return null;
}

function App() {
    const {user, isAuthenticated} = useAuth();

    let redirectUrl = new URLSearchParams(window.location.search).get('redirectUrl');
    if (redirectUrl) {
        console.log('got redirectUrl', redirectUrl);
        localStorage.setItem('redirectUrl', redirectUrl);
    }

    console.log('user', user);
    console.log('localStorage', localStorage);

    redirectUrl = localStorage.getItem('redirectUrl');

    if (isAuthenticated && redirectUrl) {
        localStorage.removeItem('redirectUrl');
        console.log('redirecting to', redirectUrl);
        window.location.href = redirectUrl;
        return null;
    }

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/logout" element={<LogoutRoute />} />

                    {/* Render your authenticated content here or other routes */}
                </Routes>

                {isAuthenticated && (
                    <div>
                        <img src={user.profilePictureUrl} alt={user.name} />
                        <span>{user.name}</span>
                        <a href="/logout">Logout</a> {/* This is the logout link */}
                    </div>
                )}

                {/* Add other routes as needed */}
            </div>
        </Router>
    );
}

export default App;