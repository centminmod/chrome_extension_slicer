document.addEventListener('DOMContentLoaded', () => {
  const slicerIframe = document.getElementById('slicerIframe');

  // Load the saved width value and set it to the popup
  chrome.storage.sync.get('popupWidth', (data) => {
    const popupWidth = data.popupWidth || 600;
    document.documentElement.style.width = `${popupWidth}px`;
  });

  slicerIframe.addEventListener('load', () => {
    // Restore the saved input text
    chrome.storage.sync.get('inputText', (data) => {
      slicerIframe.contentWindow.postMessage({ action: 'restore', inputText: data.inputText || '' }, '*');
    });

    // Listen for messages from slicer.centminmod.com
    window.addEventListener('message', (event) => {
      if (event.data.action === 'save') {
        chrome.storage.sync.set({ inputText: event.data.inputText });
      }
    }, false);
  });
});