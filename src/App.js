import './App.css';
import { useAuthUser, useAuth } from "@frontegg/react";

function App() {
    const { user, isAuthenticated } = useAuth();

    const logout = () => {
        window.location.href =  `${window.location}account/logout`;
    }

    let redirectUrl = new URLSearchParams(window.location.search).get('redirectUrl');
    if (redirectUrl) {
        console.log('got redirectUrl', redirectUrl);
        localStorage.setItem('redirectUrl', redirectUrl);
    }

    // This will redirect to login
    // const user = useAuthUser();
    console.log('user', user);
    console.log('localStorage', localStorage);

    redirectUrl = localStorage.getItem('redirectUrl');

    // if (user?.id &&  redirectUrl) {
    if (isAuthenticated  &&  redirectUrl) {
        localStorage.removeItem('redirectUrl');
        console.log('redirecting to', redirectUrl);
        window.location.href = redirectUrl;
        return null;
    }

    return (
        <div className="App">
            {isAuthenticated && (
                <div>
                    <img src={user.profilePictureUrl} alt={user.name} />
                    <span>{user.name}</span>
                </div>
            )}
        </div>
    );
}

export default App;
