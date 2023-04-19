document.addEventListener('DOMContentLoaded', () => {
  const slicerIframe = document.getElementById('slicerIframe');

  // Load the saved width value and set it to the popup
  chrome.storage.sync.get('popupWidth', (data) => {
    const popupWidth = data.popupWidth || 600;
    document.documentElement.style.width = `${popupWidth}px`;
  });

  slicerIframe.onload = () => {
    console.log('Iframe content loaded'); // Diagnostic message

    // Restore the saved input text
    chrome.storage.sync.get('inputText', (data) => {
      console.log('Restoring input text:', data.inputText || ''); // Diagnostic message
      slicerIframe.contentWindow.postMessage({ action: 'restore', inputText: data.inputText || '' }, '*');
    });

    // Listen for messages from slicer.centminmod.com
    window.addEventListener('message', (event) => {
      console.log('Message received:', event.data); // Diagnostic message

      if (event.data.action === 'save') {
        console.log('Saving input text:', event.data.inputText); // Diagnostic message
        chrome.storage.sync.set({ inputText: event.data.inputText });
      }

      // Save the updated input value to local storage
      localStorage.setItem('savedInput', event.data.inputText);
      
    }, false);
  };
});