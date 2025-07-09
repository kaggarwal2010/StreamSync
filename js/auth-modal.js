document.addEventListener('DOMContentLoaded', () => {
    const webAuth = new auth0.WebAuth(auth0Config);

    // Login function
    function login() {
        webAuth.authorize();
    }

    // Logout function
    function logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        
        webAuth.logout({
            returnTo: window.location.origin,
            clientId: auth0Config.clientId
        });
    }

    // Check authentication status
    function isAuthenticated() {
        return !!localStorage.getItem('access_token');
    }

    // Update UI based on auth status
    function updateAuthUI() {
        const loginBtn = document.getElementById('login-btn');
        const signupBtn = document.getElementById('signup-btn');
        const logoutBtn = document.getElementById('logout-btn');
        const userStatus = document.getElementById('user-status');

        if (isAuthenticated()) {
            // User is logged in
            if (loginBtn) loginBtn.style.display = 'none';
            if (signupBtn) signupBtn.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'inline-block';
            
            // Fetch and display user info
            webAuth.client.userInfo(
                localStorage.getItem('access_token'), 
                (err, user) => {
                    if (!err && user) {
                        if (userStatus) {
                            userStatus.textContent = `Welcome, ${user.name || user.email}`;
                            userStatus.style.display = 'block';
                        }
                    }
                }
            );
        } else {
            // User is logged out
            if (loginBtn) loginBtn.style.display = 'inline-block';
            if (signupBtn) signupBtn.style.display = 'inline-block';
            if (logoutBtn) logoutBtn.style.display = 'none';
            if (userStatus) userStatus.style.display = 'none';
        }
    }

    // Event Listeners
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const logoutBtn = document.getElementById('logout-btn');

    if (loginBtn) loginBtn.addEventListener('click', login);
    if (signupBtn) signupBtn.addEventListener('click', login);
    if (logoutBtn) logoutBtn.addEventListener('click', logout);

    // Initial UI update
    updateAuthUI();
});