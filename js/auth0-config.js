// Auth0 Configuration
const auth0Config = {
    domain: 'dev-31hih03hq03uoga3.us.auth0.com',
    clientId: 'JsrkKvGCNleBn5K084OrUcZLaDEsAGEX',
    redirectUri: window.location.origin + '/callback.html',
    responseType: 'token id_token',
    scope: 'openid profile email'
};

// Create Auth0 instance
const webAuth = new auth0.WebAuth(auth0Config);

// Login Function
function login() {
    webAuth.authorize();
}

// Logout Function
function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    webAuth.logout({
        returnTo: window.location.origin,
        clientId: auth0Config.clientId
    });
}

// Handle Authentication
function handleAuthentication() {
    webAuth.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
            // Set tokens in localStorage
            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);

            // Redirect to home page
            window.location.href = '/';
        } else if (err) {
            console.error('Authentication error', err);
            // Redirect to home page even if there's an error
            window.location.href = '/';
        }
    });
}

// Check if user is authenticated
function isAuthenticated() {
    const token = localStorage.getItem('access_token');
    return !!token;
}

// Get User Profile
function getProfile() {
    const token = localStorage.getItem('access_token');
    if (token) {
        webAuth.client.userInfo(token, (err, profile) => {
            if (profile) {
                // Safely update user status
                const userStatus = document.getElementById('user-status');
                if (userStatus) {
                    userStatus.textContent = 
                        `Welcome, ${profile.name || profile.email}`;
                    userStatus.style.display = 'block';
                }
            }
        });
    }
}

// Update UI based on authentication state
function updateAuthUI() {
    const loginButtons = document.getElementById('login-btn');
    const signupButtons = document.getElementById('signup-btn');
    const logoutButton = document.getElementById('logout-btn');
    const userStatus = document.getElementById('user-status');

    if (isAuthenticated()) {
        // Safely update login/signup/logout buttons
        if (loginButtons) loginButtons.style.display = 'none';
        if (signupButtons) signupButtons.style.display = 'none';
        if (logoutButton) logoutButton.style.display = 'inline-block';
        
        getProfile();
        
        if (userStatus) userStatus.style.display = 'block';
    } else {
        // Safely update login/signup/logout buttons
        if (loginButtons) loginButtons.style.display = 'inline-block';
        if (signupButtons) signupButtons.style.display = 'inline-block';
        if (logoutButton) logoutButton.style.display = 'none';
        
        if (userStatus) userStatus.style.display = 'none';
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Check for callback
    if (window.location.pathname.includes('callback.html')) {
        handleAuthentication();
    }

    // Update UI
    updateAuthUI();

    // Login button
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', login);
    }

    // Signup button (same as login for Auth0)
    const signupBtn = document.getElementById('signup-btn');
    if (signupBtn) {
        signupBtn.addEventListener('click', login);
    }

    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});