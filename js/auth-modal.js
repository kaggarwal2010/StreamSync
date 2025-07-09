document.addEventListener('DOMContentLoaded', () => {
    console.log('Auth modal script loaded');
    
    // Get buttons
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const logoutBtn = document.getElementById('logout-btn');
    
    console.log('Login button found:', !!loginBtn);
    console.log('Signup button found:', !!signupBtn);
    
    // Remove any existing event listeners
    if (loginBtn) {
        const newLoginBtn = loginBtn.cloneNode(true);
        loginBtn.parentNode.replaceChild(newLoginBtn, loginBtn);
        
        // Add Auth0 login
        newLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Login button clicked');
            if (typeof login === 'function') {
                login();
            } else {
                alert('Login function not found');
            }
        });
    }
    
    if (signupBtn) {
        const newSignupBtn = signupBtn.cloneNode(true);
        signupBtn.parentNode.replaceChild(newSignupBtn, signupBtn);
        
        // Add Auth0 signup
        newSignupBtn.addEventListener('click', (e) => {
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
});