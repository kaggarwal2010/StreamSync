// StreamSync Chat Module with Local Storage

let activeChatRoom = 'general';
let chatMessages = [];

// Initialize chat for a specific room
function initializeChat(roomId) {
  activeChatRoom = roomId || 'general';
  
  // Load messages from localStorage
  const storedMessages = JSON.parse(localStorage.getItem(`chatMessages_${activeChatRoom}`) || '[]');
  chatMessages = storedMessages;
  
  // Clear existing messages in UI
  const chatMessagesElement = document.getElementById('chat-messages');
  if (chatMessagesElement) {
    chatMessagesElement.innerHTML = '';
    
    // Restore messages
    chatMessages.forEach(displayMessage);
  }
  
  return {
    roomId: activeChatRoom,
    messageCount: chatMessages.length
  };
}

// Send a new message
function sendMessage(message, isEmote = false) {
  // Check if user is logged in
  const currentUser = window.StreamSyncAuth.getCurrentUser();
  if (!currentUser) {
    throw new Error('You must be logged in to send messages');
  }
  
  if (!message || message.trim() === '') {
    throw new Error('Message cannot be empty');
  }
  
  const newMessage = {
    id: Date.now().toString(),
    userId: currentUser.id,
    username: currentUser.username,
    message: message.trim(),
    isEmote: isEmote,
    timestamp: new Date().toISOString(),
    roomId: activeChatRoom
  };
  
  // Add to messages array
  chatMessages.push(newMessage);
  
  // Save to localStorage
  localStorage.setItem(`chatMessages_${activeChatRoom}`, JSON.stringify(chatMessages));
  
  // Display the message
  displayMessage(newMessage);
  
  return newMessage;
}

// Display a message in the chat
function displayMessage(message) {
  const chatMessagesElement = document.getElementById('chat-messages');
  if (!chatMessagesElement) return;
  
  const messageElement = document.createElement('div');
  messageElement.className = 'chat-message';
  messageElement.style.marginBottom = '8px';
  
  // Generate a consistent color for this user
  const userColor = getUserColor(message.userId);
  
  if (message.isEmote) {
    // Display emote message
    messageElement.innerHTML = `
      <span style="color: ${userColor}; font-style: italic;">
        * ${message.username} ${message.message}
      </span>
    `;
  } else {
    // Display regular message
    messageElement.innerHTML = `
      <span style="color: ${userColor}; font-weight: 600;">${message.username}: </span>
      <span>${message.message}</span>
    `;
  }
  
  chatMessagesElement.appendChild(messageElement);
  chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
}

// Generate a consistent color for a user
function getUserColor(userId) {
  const colors = [
    '#FF4500', '#1E90FF', '#00FF7F', '#FFD700', '#9370DB',
    '#FF69B4', '#00BFFF', '#32CD32', '#FF8C00', '#BA55D3'
  ];
  
  // Simple hash function to get a consistent color
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
}

// Get available chat rooms
function getChatRooms() {
  return ['general', 'gaming', 'music', 'coding', 'art'];
}

// Switch to a different chat room
function switchChatRoom(roomId) {
  if (roomId && roomId !== activeChatRoom) {
    initializeChat(roomId);
  }
  return activeChatRoom;
}

// Export chat functions
window.StreamSyncChat = {
  initializeChat,
  sendMessage,
  getMessages: () => chatMessages,
  getChatRooms,
  switchChatRoom
};