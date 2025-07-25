// StreamSync Authentication Module

// User state
let currentUser = null;

// Simulated backend API
const AuthAPI = {
    // Simulate API delay
    delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),

    // Validate user credentials
    validateUser: async (email, password) => {
        await AuthAPI.delay(800);

        // Get users from database
        const users = JSON.parse(localStorage.getItem('streamSyncUsers') || '[]');
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!user) {
            throw new Error('User not found');
        }

        if (user.password !== password) {
            throw new Error('Invalid password');
        }

        return user;
    },

    // Register new user
    registerUser: async (userData) => {
        await AuthAPI.delay(1000);

        // Get users from database
        const users = JSON.parse(localStorage.getItem('streamSyncUsers') || '[]');

        // Check if email already exists
        if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
            throw new Error('Email already registered');
        }

        // Create new user
        const newUser = {
            id: 'user_' + Date.now(),
            ...userData,
            createdAt: new Date().toISOString()
        };

        // Add to database
        users.push(newUser);
        localStorage.setItem('streamSyncUsers', JSON.stringify(users));

        return newUser;
    }
};

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate password strength
function validatePassword(password) {
    const errors = [];

    if (password.length < 8) {
        errors.push("Password must be at least 8 characters long");
    }

    if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
        errors.push("Password must contain at least one lowercase letter");
    }

    if (!/\d/.test(password)) {
        errors.push("Password must contain at least one number");
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        errors.push("Password must contain at least one special character");
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Logout function
function logout() {
    currentUser = null;
    localStorage.removeItem('streamSyncSession');
    localStorage.removeItem('streamSyncUser');
    updateAuthUI();
}

// Update UI based on authentication state
function updateAuthUI() {
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const userStatus = document.getElementById('user-status');

    if (currentUser) {
        // User is logged in
        if (loginBtn) loginBtn.style.display = 'none';
        if (signupBtn) signupBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline-block';
        if (userStatus) {
            userStatus.textContent = `Welcome, ${currentUser.username}`;
            userStatus.style.display = 'block';
        }
    } else {
        // User is logged out
        if (loginBtn) loginBtn.style.display = 'inline-block';
        if (signupBtn) signupBtn.style.display = 'inline-block';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (userStatus) userStatus.style.display = 'none';
    }
}

// Check for existing session on page load
function checkSession() {
    const savedUser = localStorage.getItem('streamSyncUser');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            console.log('User session restored:', currentUser.username);
            updateAuthUI();
            return currentUser;
        } catch (e) {
            console.error('Failed to parse saved user:', e);
            localStorage.removeItem('streamSyncUser');
        }
    }
    return null;
}

// Initialize database if empty
function initializeDatabase() {
    if (!localStorage.getItem('streamSyncUsers')) {
        localStorage.setItem('streamSyncUsers', '[]');
    }
}

// Setup authentication modal
function setupAuthModal() {
    const modal = document.getElementById('auth-modal');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const closeBtn = document.querySelector('.close-btn');
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginSubmit = document.getElementById('login-submit');
    const signupSubmit = document.getElementById('signup-submit');

    // Open modal with login form
    function openLoginModal(e) {
        if (e) e.preventDefault();
        if (modal) modal.style.display = 'block';
        if (loginForm) loginForm.classList.add('active');
        if (signupForm) signupForm.classList.remove('active');
    }

    // Open modal with signup form
    function openSignupModal(e) {
        if (e) e.preventDefault();
        if (modal) modal.style.display = 'block';
        if (signupForm) signupForm.classList.add('active');
        if (loginForm) loginForm.classList.remove('active');
    }

    // Close modal function
    function closeModal() {
        if (modal) modal.style.display = 'none';
    }

    // Add event listeners with fallback
    function addEventListenerSafely(element, event, handler) {
        if (element) {
            element.addEventListener(event, handler);
        } else {
            console.warn(`Element not found for ${event} event`);
        }
    }

    // Login button
    addEventListenerSafely(loginBtn, 'click', openLoginModal);

    // Signup button
    addEventListenerSafely(signupBtn, 'click', openSignupModal);

    // Close button
    addEventListenerSafely(closeBtn, 'click', closeModal);

    // Switch to signup
    addEventListenerSafely(switchToSignup, 'click', function(e) {
        e.preventDefault();
        if (loginForm) loginForm.classList.remove('active');
        if (signupForm) signupForm.classList.add('active');
    });

    // Switch to login
    addEventListenerSafely(switchToLogin, 'click', function(e) {
        e.preventDefault();
        if (signupForm) signupForm.classList.remove('active');
        if (loginForm) loginForm.classList.add('active');
    });

    // Login form submission
    addEventListenerSafely(loginSubmit, 'submit', async function(e) {
        e.preventDefault();
        const emailInput = document.getElementById('login-email');
        const passwordInput = document.getElementById('login-password');

        if (!emailInput || !passwordInput) {
            console.error('Login input elements not found');
            return;
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        try {
            const user = await AuthAPI.validateUser(email, password);
            currentUser = user;
            localStorage.setItem('streamSyncUser', JSON.stringify(user));
            updateAuthUI();
            closeModal();
            alert(`Login successful! Welcome, ${user.username}`);
        } catch (error) {
            alert(error.message);
        }
    });

    // Signup form submission
    addEventListenerSafely(signupSubmit, 'submit', async function(e) {
        e.preventDefault();
        const usernameInput = document.getElementById('signup-username');
        const emailInput = document.getElementById('signup-email');
        const passwordInput = document.getElementById('signup-password');
        const confirmPasswordInput = document.getElementById('signup-confirm-password');

        if (!usernameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
            console.error('Signup input elements not found');
            return;
        }

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Validate password strength
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
            alert(passwordValidation.errors[0]);
            return;
        }

        try {
            const user = await AuthAPI.registerUser({ username, email, password });
            currentUser = user;
            localStorage.setItem('streamSyncUser', JSON.stringify(user));
            updateAuthUI();
            closeModal();
            alert(`Signup successful! Welcome, ${user.username}`);
        } catch (error) {
            alert(error.message);
        }
    });
}

// Call database initialization
initializeDatabase();

// Ensure DOM is fully loaded before setting up modal
document.addEventListener('DOMContentLoaded', function() {
    checkSession();
    updateAuthUI();
    setupAuthModal();

    // Add logout button event listener
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});

// Export auth functions
window.StreamSyncAuth = {
    login: AuthAPI.validateUser,
    signup: AuthAPI.registerUser,
    logout,
    isLoggedIn: () => currentUser !== null,
    getCurrentUser: () => currentUser
};