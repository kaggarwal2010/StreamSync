document.addEventListener('DOMContentLoaded', () => {
    console.log('Auth modal script loaded');

    // Get buttons
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const logoutBtn = document.getElementById('logout-btn');

    console.log('Login button found:', !!loginBtn);
    console.log('Signup button found:', !!signupBtn);

    // Check if Auth0 is initialized
    function checkAuth0Ready() {
        if (typeof webAuth === 'undefined') {
            console.log('Auth0 not ready yet, waiting...');
            setTimeout(checkAuth0Ready, 100);
            return;
        }
        
        console.log('Auth0 is ready, setting up buttons');
        setupButtons();
    }
    
    function setupButtons() {
        // Add Auth0 login
        if (loginBtn) {
            loginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Login button clicked');
                if (typeof login === 'function') {
                    login();
                } else {
                    alert('Login function not found');
                }
            });
        }

        // Add Auth0 signup
        if (signupBtn) {
            signupBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Signup button clicked');
                if (typeof login === 'function') {
                    login();
                } else {
                    alert('Login function not found');
                }
            });
        }

        // Logout functionality
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Logout button clicked');
                if (typeof logout === 'function') {
                    logout();
                } else {
                    alert('Logout function not found');
                }
            });
        }
    }
    
    // Start checking if Auth0 is ready
    checkAuth0Ready();
});