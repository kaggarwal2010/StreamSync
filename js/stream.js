let activeStream = null;
let streamViewers = 0;
let isLive = false;
let streamChat = [];

function initializeStream(streamId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (streamId) {
        activeStream = {
          id: streamId,
          title: 'My Stream',
          description: 'Welcome to my stream!',
          startTime: new Date(),
          category: 'Just Chatting'
        };
        resolve(activeStream);
      } else {
        reject(new Error('Invalid stream ID'));
      }
    }, 800);
  });
}

function startStream(title, category) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const streamId = 'stream_' + Math.random().toString(36).substr(2, 9);
      activeStream = {
        id: streamId,
        title: title || 'Untitled Stream',
        description: '',
        startTime: new Date(),
        category: category || 'Just Chatting'
      };
      isLive = true;
      streamViewers = 0;
      
      const viewerIncrement = setInterval(() => {
        if (isLive && Math.random() > 0.3) {
          streamViewers += Math.floor(Math.random() * 3) + 1;
        }
      }, 5000);
      
      activeStream.viewerInterval = viewerIncrement;
      resolve(activeStream);
    }, 1500);
  });
}

function endStream() {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (activeStream && activeStream.viewerInterval) {
        clearInterval(activeStream.viewerInterval);
      }
      
      const streamResult = {
        ...activeStream,
        endTime: new Date(),
        duration: activeStream ? (new Date() - activeStream.startTime) / 1000 / 60 : 0,
        peakViewers: streamViewers,
        chatMessages: streamChat.length
      };
      
      activeStream = null;
      isLive = false;
      streamViewers = 0;
      streamChat = [];
      
      resolve(streamResult);
    }, 1000);
  });
}

function getStreamInfo() {
  return {
    stream: activeStream,
    isLive: isLive,
    viewers: streamViewers,
    chatCount: streamChat.length
  };
}

function updateStreamInfo(updates) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (activeStream && updates) {
        activeStream = {
          ...activeStream,
          ...updates,
          lastUpdated: new Date()
        };
      }
      resolve(activeStream);
    }, 500);
  });
}

function getPopularStreams(category, limit = 10) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const categories = [
        'Just Chatting', 'Gaming', 'Music', 'Art', 'Coding', 'Sports'
      ];
      
      const streamers = [
        'GameMaster42', 'DevGuru', 'ArtistExtraordinaire', 'MusicLover',
        'CodeWizard', 'SportsFan', 'TechTalker', 'PixelPainter'
      ];
      
      const streams = [];
      
      for (let i = 0; i < limit; i++) {
        const randomCategory = category || categories[Math.floor(Math.random() * categories.length)];
        const randomStreamer = streamers[Math.floor(Math.random() * streamers.length)];
        const viewers = Math.floor(Math.random() * 10000) + 100;
        
        streams.push({
          id: 'stream_' + Math.random().toString(36).substr(2, 9),
          title: `${randomStreamer}'s Amazing ${randomCategory} Stream`,
          user: randomStreamer,
          category: randomCategory,
          viewers: viewers,
          thumbnail: `https://placehold.co/600x400/${Math.floor(Math.random()*16777215).toString(16)}/ffffff?text=${randomCategory}`,
          startedAt: new Date(Date.now() - Math.floor(Math.random() * 10000000))
        });
      }
      
      resolve(streams);
    }, 1000);
  });
}

window.StreamSyncStream = {
  initializeStream,
  startStream,
  endStream,
  getStreamInfo,
  updateStreamInfo,
  getPopularStreams
};