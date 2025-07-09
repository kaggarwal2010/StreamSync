document.addEventListener('DOMContentLoaded', () => {
    // Remove any existing login/signup event listeners
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');

    // Clear any existing click events
    if (loginBtn) {
        // Clone the button to remove all existing event listeners
        const newLoginBtn = loginBtn.cloneNode(true);
        loginBtn.parentNode.replaceChild(newLoginBtn, loginBtn);
        
        // Add new Auth0 login event listener
        newLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Use Auth0 login function from auth0-config.js
            login();
        });
    }

    if (signupBtn) {
        // Clone the button to remove all existing event listeners
        const newSignupBtn = signupBtn.cloneNode(true);
        signupBtn.parentNode.replaceChild(newSignupBtn, signupBtn);
        
        // Add new Auth0 signup event listener
        newSignupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Use Auth0 login function from auth0-config.js
            login();
        });
    }
});