let chatMessages = [];
let chatUsers = new Map();
let activeChatRoom = null;

function initializeChat(roomId, username) {
  return new Promise((resolve) => {
    setTimeout(() => {
      activeChatRoom = roomId || 'general';
      
      if (username && !chatUsers.has(username)) {
        chatUsers.set(username, {
          username,
          joinedAt: new Date(),
          isActive: true,
          color: getRandomUserColor()
        });
      }
      
      resolve({
        roomId: activeChatRoom,
        userCount: chatUsers.size,
        recentMessages: chatMessages.slice(-20)
      });
    }, 500);
  });
}

function sendMessage(username, message, isEmote = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!username || !message) {
        reject(new Error('Username and message are required'));
        return;
      }
      
      if (!chatUsers.has(username)) {
        chatUsers.set(username, {
          username,
          joinedAt: new Date(),
          isActive: true,
          color: getRandomUserColor()
        });
      }
      
      const newMessage = {
        id: Date.now().toString(),
        username,
        userColor: chatUsers.get(username).color,
        message,
        timestamp: new Date(),
        isEmote,
        room: activeChatRoom
      };
      
      chatMessages.push(newMessage);
      
      if (chatMessages.length > 200) {
        chatMessages = chatMessages.slice(-200);
      }
      
      resolve(newMessage);
    }, 100);
  });
}

function getMessages(limit = 50) {
  return chatMessages.slice(-limit);
}

function getActiveUsers() {
  const activeUsers = [];
  chatUsers.forEach(user => {
    if (user.isActive) {
      activeUsers.push(user);
    }
  });
  return activeUsers;
}

function leaveChat(username) {
  if (chatUsers.has(username)) {
    const user = chatUsers.get(username);
    user.isActive = false;
    chatUsers.set(username, user);
    return true;
  }
  return false;
}

function joinChat(username) {
  if (chatUsers.has(username)) {
    const user = chatUsers.get(username);
    user.isActive = true;
    chatUsers.set(username, user);
  } else {
    chatUsers.set(username, {
      username,
      joinedAt: new Date(),
      isActive: true,
      color: getRandomUserColor()
    });
  }
  return chatUsers.get(username);
}

function getRandomUserColor() {
  const colors = [
    '#FF4500', '#1E90FF', '#00FF7F', '#FFD700', '#9370DB',
    '#FF69B4', '#00BFFF', '#32CD32', '#FF8C00', '#BA55D3'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function getChatRooms() {
  return ['general', 'gaming', 'music', 'coding', 'art'];
}

function switchChatRoom(roomId) {
  activeChatRoom = roomId;
  return activeChatRoom;
}

window.StreamSyncChat = {
  initializeChat,
  sendMessage,
  getMessages,
  getActiveUsers,
  leaveChat,
  joinChat,
  getChatRooms,
  switchChatRoom
};