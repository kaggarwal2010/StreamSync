// Auth0 Configuration
const auth0Config = {
    domain: 'dev-31hih03hq03uoga3.us.auth0.com',
    clientId: 'JsrkKvGCNleBn5K084OrUcZLaDEsAGEX',
    redirectUri: window.location.origin + '/callback.html',
    responseType: 'token id_token',
    scope: 'openid profile email'
};

// Create Auth0 instance - make sure this is defined globally
let webAuth;

// Initialize Auth0 when the script loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Auth0 WebAuth instance');
    try {
        // Check if auth0 is available
        if (typeof auth0 !== 'undefined') {
            webAuth = new auth0.WebAuth(auth0Config);
            console.log('Auth0 WebAuth initialized successfully');
        } else {
            console.error('Auth0 library not loaded');
            alert('Authentication service not available. Please try again later.');
        }
    } catch (error) {
        console.error('Error initializing Auth0:', error);
        alert('Error initializing authentication: ' + error.message);
    }
});

// Login Function with debugging
function login() {
    console.log('Login initiated');
    try {
        if (!webAuth) {
            throw new Error('Authentication not initialized');
        }
        webAuth.authorize({
            redirectUri: auth0Config.redirectUri,
            responseType: auth0Config.responseType,
            scope: auth0Config.scope
        });
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed: ' + error.message);
    }
}

// Logout Function
function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    if (webAuth) {
        webAuth.logout({
            returnTo: window.location.origin,
            clientId: auth0Config.clientId
        });
    } else {
        window.location.href = '/';
    }
}

// Handle Authentication
function handleAuthentication() {
    if (!webAuth) {
        console.error('Auth0 not initialized for handleAuthentication');
        return;
    }
    
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
    if (token && webAuth) {
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