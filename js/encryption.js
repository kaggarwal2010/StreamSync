class StreamSyncEncryption {
  // Generate a secret key (you'd want this to be more complex in production)
  static generateSecretKey() {
    return btoa(Math.random().toString(36).substring(2));
  }

  // Encrypt data
  static encrypt(data, secretKey) {
    try {
      const jsonString = JSON.stringify(data);
      const encrypted = jsonString.split('').map((char, index) => {
        const charCode = char.charCodeAt(0);
        const keyChar = secretKey.charCodeAt(index % secretKey.length);
        return String.fromCharCode(charCode ^ keyChar);
      }).join('');
      return btoa(encrypted);
    } catch (error) {
      console.error('Encryption error:', error);
      return null;
    }
  }

  // Decrypt data
  static decrypt(encryptedData, secretKey) {
    try {
      const decoded = atob(encryptedData);
      const decrypted = decoded.split('').map((char, index) => {
        const charCode = char.charCodeAt(0);
        const keyChar = secretKey.charCodeAt(index % secretKey.length);
        return String.fromCharCode(charCode ^ keyChar);
      }).join('');
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Decryption error:', error);
      return null;
    }
  }
}

// Expose to global scope
window.StreamSyncEncryption = StreamSyncEncryption;