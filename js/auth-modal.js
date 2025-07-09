document.addEventListener('DOMContentLoaded', () => {
    const authModal = document.getElementById('auth-modal');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const closeBtn = document.querySelector('.close-btn');
    
    // Login and Signup buttons in navigation
    const loginNavBtn = document.getElementById('login-btn');
    const signupNavBtn = document.getElementById('signup-btn');

    // Switch form links
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');

    // Open modal functions
    function openLoginModal() {
        authModal.style.display = 'block';
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    }

    function openSignupModal() {
        authModal.style.display = 'block';
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
    }

    // Close modal function
    function closeModal() {
        authModal.style.display = 'none';
    }

    // Event Listeners for opening modal
    if (loginNavBtn) {
        loginNavBtn.addEventListener('click', openLoginModal);
    }

    if (signupNavBtn) {
        signupNavBtn.addEventListener('click', openSignupModal);
    }

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Switch between login and signup
    if (switchToSignup) {
        switchToSignup.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.classList.remove('active');
            signupForm.classList.add('active');
        });
    }

    if (switchToLogin) {
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            signupForm.classList.remove('active');
            loginForm.classList.add('active');
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            closeModal();
        }
    });

    // Login form submission
    const loginSubmit = document.getElementById('login-submit');
    if (loginSubmit) {
        loginSubmit.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Basic validation
            if (email && password) {
                // Simulate login (replace with actual authentication later)
                alert('Login attempted with: ' + email);
                closeModal();
            } else {
                alert('Please fill in all fields');
            }
        });
    }

    // Signup form submission
    const signupSubmit = document.getElementById('signup-submit');
    if (signupSubmit) {
        signupSubmit.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('signup-username').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;
            
            // Basic validation
            if (username && email && password && confirmPassword) {
                if (password !== confirmPassword) {
                    alert('Passwords do not match');
                    return;
                }
                
                // Simulate signup (replace with actual authentication later)
                alert('Signup attempted with: ' + email + ', username: ' + username);
                closeModal();
            } else {
                alert('Please fill in all fields');
            }
        });
    }
});
