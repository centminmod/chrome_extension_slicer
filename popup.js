chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'save') {
    console.log('Saving input text:', request.inputText);
    chrome.storage.sync.set({ inputText: request.inputText });

    try {
      localStorage.setItem('savedInput', request.inputText);
      console.log('Setting localStorage.savedInput to:', request.inputText);
    } catch (e) {
      console.error('Failed to save input text to local storage:', e);
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Load the saved width value and set it to the popup
  chrome.storage.sync.get('popupWidth', (data) => {
    const popupWidth = data.popupWidth || 600;
    console.log('Retrieved popupWidth:', popupWidth);
    document.getElementById('container').style.width = `\${popupWidth}px`;
    document.getElementById('slicerIframe').style.width = `\${popupWidth}px`;
  });
});
