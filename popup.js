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

    // Add event listener for message event
    slicerIframe.contentWindow.addEventListener('message', (event) => {
      console.log('Message received:', event.data); // Diagnostic message

      if (event.data.action === 'save') {
        console.log('Saving input text:', event.data.inputText); // Diagnostic message
        chrome.storage.sync.set({ inputText: event.data.inputText });

        // Save the updated input value to local storage
        try {
          localStorage.setItem('savedInput', event.data.inputText);
          console.log('Setting localStorage.savedInput to:', event.data.inputText);
        } catch (e) {
          console.error('Failed to save input text to local storage:', e);
        }
      }
    });
  };
});
