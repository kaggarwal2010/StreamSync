// StreamSync Authentication Module

// User state (would normally use proper auth management)
let currentUser = null;

// Check if user is logged in
function isLoggedIn() {
  return currentUser !== null;
}

// Mock login function (would normally use Firebase Auth or similar)
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
        resolve(currentUser);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
}

// Mock signup function
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

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', () => {
  checkSession();
});

// Export auth functions (for use with import in other files later)
window.StreamSyncAuth = {
  login,
  signup,
  logout,
  isLoggedIn,
  checkSession,
  getCurrentUser: () => currentUser
};