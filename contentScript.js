// Restore the saved input text
chrome.storage.sync.get('inputText', (data) => {
  console.log('Restoring input text:', data.inputText || ''); // Diagnostic message
  window.postMessage({ action: 'restore', inputText: data.inputText || '' }, '*');
});

// Add event listener for message event
window.addEventListener('message', (event) => {
  console.log('Message received:', event.data); // Diagnostic message

  if (event.data.action === 'save') {
    // Send a message to the popup script to save the input text
    chrome.runtime.sendMessage({ action: 'save', inputText: event.data.inputText });
  }
});
