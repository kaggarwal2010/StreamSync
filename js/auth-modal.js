document.addEventListener('DOMContentLoaded', () => {
    // Get modal elements
    const authModal = document.getElementById('auth-modal');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const closeBtn = document.querySelector('.close-btn');
    
    // Get navigation buttons
    const loginNavBtn = document.getElementById('login-btn');
    const signupNavBtn = document.getElementById('signup-btn');
    
    // Get form switch links
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');
    
    // Initially hide the modal
    if (authModal) {
        authModal.style.display = 'none';
    }
    
    // Open modal functions
    function openLoginModal() {
        if (authModal && loginForm && signupForm) {
            authModal.style.display = 'block';
            loginForm.classList.add('active');
            signupForm.classList.remove('active');
        }
    }
    
    function openSignupModal() {
        if (authModal && loginForm && signupForm) {
            authModal.style.display = 'block';
            signupForm.classList.add('active');
            loginForm.classList.remove('active');
        }
    }
    
    // Close modal function
    function closeModal() {
        if (authModal) {
            authModal.style.display = 'none';
        }
    }
    
    // Event Listeners for opening modal
    if (loginNavBtn) {
        loginNavBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openLoginModal();
        });
    }
    
    if (signupNavBtn) {
        signupNavBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openSignupModal();
        });
    }
    
    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Switch between login and signup
    if (switchToSignup) {
        switchToSignup.addEventListener('click', (e) => {
            e.preventDefault();
            if (loginForm && signupForm) {
                loginForm.classList.remove('active');
                signupForm.classList.add('active');
            }
        });
    }
    
    if (switchToLogin) {
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            if (loginForm && signupForm) {
                signupForm.classList.remove('active');
                loginForm.classList.add('active');
            }
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
                
                closeModal();
            } else {
                alert('Please fill in all fields');
            }
        });
    }
});