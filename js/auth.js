

// User state (would normally use proper auth management)
let currentUser = null;

// Check if user is logged in
function isLoggedIn() {
  return currentUser !== null;
}

// Login function
function login(email, password) {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        // Mock successful login
        currentUser = {
          id: 'user123',
          username: email.split('@')[0],
          email: email,
          avatar: 'https://placehold.co/100/6441a5/ffffff?text=' + email.charAt(0).toUpperCase()
        };
        localStorage.setItem('streamSyncUser', JSON.stringify(currentUser));
        updateAuthUI(); // Update UI after login
        resolve(currentUser);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
}

// Signup function
function signup(username, email, password) {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      if (username && email && password) {
        // Mock successful signup
        currentUser = {
          id: 'user' + Math.floor(Math.random() * 1000),
          username: username,
          email: email,
          avatar: 'https://placehold.co/100/6441a5/ffffff?text=' + username.charAt(0).toUpperCase()
        };
        localStorage.setItem('streamSyncUser', JSON.stringify(currentUser));
        updateAuthUI(); // Update UI after signup
        resolve(currentUser);
      } else {
        reject(new Error('Please fill in all fields'));
      }
    }, 1000);
  });
}

// Logout function
function logout() {
  return new Promise((resolve) => {
    setTimeout(() => {
      currentUser = null;
      localStorage.removeItem('streamSyncUser');
      updateAuthUI(); // Update UI after logout
      resolve(true);
    }, 500);
  });
}

// Check for existing session on page load
function checkSession() {
  const savedUser = localStorage.getItem('streamSyncUser');
  if (savedUser) {
    try {
      currentUser = JSON.parse(savedUser);
      console.log('User session restored:', currentUser.username);
      return currentUser;
    } catch (e) {
      console.error('Failed to parse saved user:', e);
      localStorage.removeItem('streamSyncUser');
    }
  }
  return null;
}

// Update UI based on authentication state
function updateAuthUI() {
  const loginBtn = document.getElementById('login-btn');
  const signupBtn = document.getElementById('signup-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const userStatus = document.getElementById('user-status');
  
  if (isLoggedIn()) {
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

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', () => {
  checkSession();
  updateAuthUI();
  setupAuthModal();
});

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
  if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.style.display = 'block';
      loginForm.classList.add('active');
      signupForm.classList.remove('active');
    });
  }

  // Open modal with signup form
  if (signupBtn) {
    signupBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.style.display = 'block';
      signupForm.classList.add('active');
      loginForm.classList.remove('active');
    });
  }

  // Close modal
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  // Switch between forms
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

  // Handle login form submission
  if (loginSubmit) {
    loginSubmit.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      
      login(email, password)
        .then(user => {
          console.log('Login successful:', user);
          modal.style.display = 'none';
        })
        .catch(error => {
          console.error('Login failed:', error);
          alert('Login failed: ' + error.message);
        });
    });
  }

  // Handle signup form submission
  if (signupSubmit) {
    signupSubmit.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('signup-username').value;
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;
      const confirmPassword = document.getElementById('signup-confirm-password').value;
      
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      
      signup(username, email, password)
        .then(user => {
          console.log('Signup successful:', user);
          modal.style.display = 'none';
        })
        .catch(error => {
          console.error('Signup failed:', error);
          alert('Signup failed: ' + error.message);
        });
    });
  }

  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
  
  // Add logout functionality
  const logoutButton = document.getElementById('logout-btn');
  if (logoutButton) {
    logoutButton.addEventListener('click', (e) => {
      e.preventDefault();
      logout()
        .then(() => {
          console.log('Logged out successfully');
        })
        .catch(error => {
          console.error('Logout error:', error);
        });
    });
  }
}

// Export auth functions (for use with import in other files later)
window.StreamSyncAuth = {
  login,
  signup,
  logout,
  isLoggedIn,
  checkSession,
  getCurrentUser: () => currentUser
};