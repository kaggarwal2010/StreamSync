
// StreamSync Authentication Module

// User state
let currentUser = null;

// Simulated backend API (in a real app, these would be actual API calls)
const API = {
  // Simulate API delay
  delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
  
  // Hash password (in a real app, this would be done server-side)
  hashPassword: async (password) => {
    // This is a simple hash for demonstration - NOT secure for production
    // In a real app, use bcrypt or similar on the server
    const encoder = new TextEncoder();
    const data = encoder.encode(password + "StreamSyncSalt");
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  },
  
  // Validate user credentials
  validateUser: async (email, password) => {
    await API.delay(800); // Simulate network delay
    
    // Get users from database
    const users = JSON.parse(localStorage.getItem('streamSyncUsers') || '[]');
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Hash the provided password and compare
    const hashedPassword = await API.hashPassword(password);
    if (user.password !== hashedPassword) {
      throw new Error('Invalid password');
    }
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
  
  // Register new user
  registerUser: async (userData) => {
    await API.delay(1000); // Simulate network delay
    
    // Get users from database
    const users = JSON.parse(localStorage.getItem('streamSyncUsers') || '[]');
    
    // Check if email already exists
    if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
      throw new Error('Email already registered');
    }
    
    // Hash password
    const hashedPassword = await API.hashPassword(userData.password);
    
    // Create new user
    const newUser = {
      id: 'user_' + Date.now() + Math.floor(Math.random() * 1000),
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
      avatar: `https://placehold.co/100/6441a5/ffffff?text=${userData.username.charAt(0).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
    
    // Add to database
    users.push(newUser);
    localStorage.setItem('streamSyncUsers', JSON.stringify(users));
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
};

// Check if user is logged in
function isLoggedIn() {
  return currentUser !== null;
}

// Validate email format
function isValidEmail(email) {
  // RFC 5322 compliant email regex
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

// Login function
async function login(email, password) {
  try {
    // Validate inputs
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    if (!isValidEmail(email)) {
      throw new Error('Please enter a valid email address');
    }
    
    // Validate with backend
    const user = await API.validateUser(email, password);
    
    // Update last login time
    const users = JSON.parse(localStorage.getItem('streamSyncUsers') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex].lastLogin = new Date().toISOString();
      localStorage.setItem('streamSyncUsers', JSON.stringify(users));
    }
    
    // Set current user
    currentUser = user;
    
    // Store session token (in a real app, this would be a JWT)
    const sessionToken = btoa(user.id + ':' + Date.now());
    localStorage.setItem('streamSyncSession', sessionToken);
    localStorage.setItem('streamSyncUser', JSON.stringify(user));
    
    // Update UI
    updateAuthUI();
    
    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;  // Re-throw the error so it can be caught by the caller
  }
}
// Show form error message
function showFormError(form, message) {
  // Remove any existing error
  clearFormErrors();
  
  // Create error element
  const errorDiv = document.createElement('div');
  errorDiv.className = 'form-error';
  errorDiv.textContent = message;
  
  // Insert at top of form
  const firstChild = form.firstChild;
  form.insertBefore(errorDiv, firstChild);
}

// Clear all form errors
function clearFormErrors() {
  const errors = document.querySelectorAll('.form-error');
  errors.forEach(error => error.remove());
}

// Update password strength indicator
function updatePasswordStrength(password) {
  const strengthIndicator = document.getElementById('password-strength');
  if (!strengthIndicator) return;
  
  // Check password strength
  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  
  let strength = 'weak';
  let color = 'var(--danger-color)';
  
  if (hasLength && hasUpper && hasLower && hasNumber && hasSpecial) {
    strength = 'very strong';
    color = 'var(--success-color)';
  } else if (hasLength && hasUpper && hasLower && hasNumber) {
    strength = 'strong';
    color = '#43b581'; // Success color
  } else if (hasLength && ((hasUpper && hasLower) || (hasLower && hasNumber) || (hasUpper && hasNumber))) {
    strength = 'medium';
    color = 'var(--warning-color)';
  }
  
  // Create requirements list
  let requirementsList = '<ul class="password-requirements">';
  requirementsList += `<li class="${hasLength ? 'met' : 'unmet'}">At least 8 characters</li>`;
  requirementsList += `<li class="${hasUpper ? 'met' : 'unmet'}">At least 1 uppercase letter</li>`;
  requirementsList += `<li class="${hasLower ? 'met' : 'unmet'}">At least 1 lowercase letter</li>`;
  requirementsList += `<li class="${hasNumber ? 'met' : 'unmet'}">At least 1 number</li>`;
  requirementsList += `<li class="${hasSpecial ? 'met' : 'unmet'}">At least 1 special character</li>`;
  requirementsList += '</ul>';
  
  // Update indicator
  strengthIndicator.innerHTML = `Password strength: <span style="color:${color}">${strength}</span>${requirementsList}`;
}

// Handle social login
function handleSocialLogin(provider) {
  // In a real app, this would redirect to OAuth flow
  console.log(`Initiating ${provider} login`);
  
  // Simulate successful social login after delay
  setTimeout(() => {
    const user = {
      id: 'social_' + Date.now(),
      username: `${provider}User${Math.floor(Math.random() * 1000)}`,
      email: `user${Math.floor(Math.random() * 1000)}@${provider.toLowerCase()}.example.com`,
      avatar: `https://placehold.co/100/6441a5/ffffff?text=${provider.charAt(0)}`,
      provider: provider
    };
    
    // Set current user
    currentUser = user;
    
    // Store session
    const sessionToken = btoa(user.id + ':' + Date.now());
    localStorage.setItem('streamSyncSession', sessionToken);
    localStorage.setItem('streamSyncUser', JSON.stringify(user));
    
    // Update UI
    updateAuthUI();
    
    // Close modal
    const modal = document.getElementById('auth-modal');
    if (modal) modal.style.display = 'none';
    
    console.log(`${provider} login successful:`, user);
  }, 1500);
}

// Show reset password form
function showResetPasswordForm(email) {
  const loginForm = document.getElementById('login-form');
  if (!loginForm) return;
  
  // Hide login form
  loginForm.classList.remove('active');
  
  // Check if reset form already exists
  let resetForm = document.getElementById('reset-password-form');
  
  if (!resetForm) {
    // Create reset form
    resetForm = document.createElement('div');
    resetForm.id = 'reset-password-form';
    resetForm.className = 'auth-form';
    resetForm.innerHTML = `
      <h2>Reset Password</h2>
      <p>Enter your email address to receive a password reset link.</p>
      <form id="reset-submit">
        <div class="form-group">
          <label for="reset-email">Email</label>
          <input type="email" id="reset-email" value="${email}" required>
        </div>
        <button type="submit" class="primary-btn">Send Reset Link</button>
      </form>
      <p class="switch-form"><a href="#" id="back-to-login">Back to Login</a></p>
    `;
    
    // Add to auth container
    const authContainer = document.querySelector('.auth-container');
    authContainer.appendChild(resetForm);
    
    // Setup back to login link
    const backToLogin = document.getElementById('back-to-login');
    backToLogin.addEventListener('click', (e) => {
      e.preventDefault();
      resetForm.classList.remove('active');
      loginForm.classList.add('active');
    });
    
    // Setup reset form submission
    const resetSubmit = document.getElementById('reset-submit');
    resetSubmit.addEventListener('submit', (e) => {
      e.preventDefault();
      const resetEmail = document.getElementById('reset-email').value.trim();
      
      if (!isValidEmail(resetEmail)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Show loading state
      const submitBtn = resetSubmit.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.innerHTML = '<span class="spinner"></span>Sending...';
      submitBtn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        alert(`Password reset link sent to ${resetEmail}. Check your email inbox.`);
        
        // Reset button
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        
        // Go back to login
        resetForm.classList.remove('active');
        loginForm.classList.add('active');
      }, 1500);
    });
  }
  
  // Show reset form
  resetForm.classList.add('active');
}

// Initialize database if empty
function initializeDatabase() {
  if (!localStorage.getItem('streamSyncUsers')) {
    localStorage.setItem('streamSyncUsers', '[]');
  }
}

// Call database initialization
initializeDatabase();

// Export auth functions
window.StreamSyncAuth = {
  login,
  signup,
  logout,
  isLoggedIn,
  checkSession,
  getCurrentUser: () => currentUser
};