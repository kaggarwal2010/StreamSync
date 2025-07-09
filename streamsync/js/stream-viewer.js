document.addEventListener('DOMContentLoaded', () => {
  initializeStreamViewer();
  setupTabNavigation();
  setupChatFunctionality();
});

function initializeStreamViewer() {
  const startStreamBtn = document.getElementById('start-stream-btn');
  const viewerCount = document.getElementById('viewer-count');
  
  if (startStreamBtn) {
    startStreamBtn.addEventListener('click', () => {
      const videoPlaceholder = document.querySelector('.video-placeholder');
      if (videoPlaceholder) {
        videoPlaceholder.innerHTML = `
          <video id="stream-video" autoplay muted>
            <source src="#" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        `;
        
        simulateStreamStart();
      }
    });
  }
  
  function simulateStreamStart() {
    let viewers = 0;
    const viewerInterval = setInterval(() => {
      viewers += Math.floor(Math.random() * 3) + 1;
      if (viewerCount) {
        viewerCount.textContent = viewers;
      }
    }, 5000);
    
    addSystemMessage('Stream started just now');
  }
}

function setupTabNavigation() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-tab');
      
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.add('hidden'));
      
      button.classList.add('active');
      document.getElementById(`${tabName}-tab`).classList.remove('hidden');
    });
  });
}

function setupChatFunctionality() {
  const chatInput = document.getElementById('chat-input');
  const sendChatBtn = document.getElementById('send-chat-btn');
  const chatMessages = document.getElementById('chat-messages');
  
  if (sendChatBtn && chatInput && chatMessages) {
    sendChatBtn.addEventListener('click', () => {
      sendChatMessage();
    });
    
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendChatMessage();
      }
    });
  }
  
  function sendChatMessage() {
    const message = chatInput.value.trim();
    if (message) {
      addChatMessage('Guest', message);
      chatInput.value = '';
      
      if (Math.random() > 0.7) {
        setTimeout(() => {
          const responses = [
            'Thanks for the message!',
            'Great point!',
            'I agree with you',
            'Welcome to the stream!',
            'Let me know if you have any questions',
            'That\'s an interesting perspective'
          ];
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          addChatMessage('GameMaster42', randomResponse, true);
        }, 1500 + Math.random() * 3000);
      }
    }
  }
}

function addChatMessage(username, message, isStreamer = false) {
  const chatMessages = document.getElementById('chat-messages');
  if (!chatMessages) return;
  
  const messageElement = document.createElement('div');
  messageElement.className = 'chat-message';
  messageElement.style.marginBottom = '8px';
  
  const usernameColor = isStreamer ? 'var(--primary-color)' : getRandomColor(username);
  
  messageElement.innerHTML = `
    <span style="color: ${usernameColor}; font-weight: 600;">${username}: </span>
    <span>${message}</span>
  `;
  
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addSystemMessage(message) {
  const chatMessages = document.getElementById('chat-messages');
  if (!chatMessages) return;
  
  const messageElement = document.createElement('div');
  messageElement.className = 'system-message';
  messageElement.innerHTML = `<span>${message}</span>`;
  
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getRandomColor(username) {
  const colors = [
    '#FF4500', '#1E90FF', '#00FF7F', '#FFD700', '#9370DB',
    '#FF69B4', '#00BFFF', '#32CD32', '#FF8C00', '#BA55D3'
  ];
  
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
}