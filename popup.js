document.addEventListener('DOMContentLoaded', () => {
  const slicerIframe = document.getElementById('slicerIframe');

  // Load the saved width value and set it to the popup
  chrome.storage.sync.get('popupWidth', (data) => {
    const popupWidth = data.popupWidth || 600;
    document.documentElement.style.width = `${popupWidth}px`;
  });
});
