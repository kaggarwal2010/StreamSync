// StreamSync Authentication Module

// User state
let currentUser = null;

// Simulated backend API (in a real app, these would be actual API calls)
const API = {
  // Simulate API delay
  delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
  
  // Validate user credentials
  validateUser: async (email, password) => {
    await API.delay(800);
    
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
    await API.delay(1000);
    
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

// Setup authentication modal
function setupAuthModal() {
  console.log('Setting up auth modal'); // Debug log
  
  const modal = document.getElementById('auth-modal');
  const loginBtn = document.getElementById('login-btn');
  const signupBtn = document.getElementById('signup-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const closeBtn = document.querySelector('.close-btn');
  const switchToSignup = document.getElementById('switch-to-signup');
  const switchToLogin = document.getElementById('switch-to-login');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const loginSubmit = document.getElementById('login-submit');
  const signupSubmit = document.getElementById('signup-submit');

  // Debug logging to check if elements exist
  console.log('Login button exists:', !!loginBtn);
  console.log('Signup button exists:', !!signupBtn);
  console.log('Modal exists:', !!modal);

  // Open modal with login form
  function openLoginModal(e) {
    console.log('Login button clicked'); // Debug log
    if (e) e.preventDefault();
    if (modal) modal.style.display = 'block';
    if (loginForm) loginForm.classList.add('active');
    if (signupForm) signupForm.classList.remove('active');
  }

  // Open modal with signup form
  function openSignupModal(e) {
    console.log('Signup button clicked'); // Debug log
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
      const user = await API.validateUser(email, password);
      alert(`Login successful! Welcome, ${user.username}`);
      closeModal();
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

    try {
      const user = await API.registerUser({ username, email, password });
      alert(`Signup successful! Welcome, ${user.username}`);
      closeModal();
    } catch (error) {
      alert(error.message);
    }
  });

  // Close modal when clicking outside
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
}

// Initialize database if empty
function initializeDatabase() {
  if (!localStorage.getItem('streamSyncUsers')) {
    localStorage.setItem('streamSyncUsers', '[]');
  }
}

// Call database initialization
initializeDatabase();

// Ensure DOM is fully loaded before setting up modal
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded');
  setupAuthModal();
});