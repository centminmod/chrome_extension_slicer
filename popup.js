document.addEventListener('DOMContentLoaded', () => {
  // Load the saved width value and set it to the popup
  chrome.storage.sync.get('popupWidth', (data) => {
    const popupWidth = data.popupWidth || 640;
    console.log('Retrieved popupWidth:', popupWidth);
    document.getElementById('container').style.width = `\${popupWidth}px`;
    document.getElementById('slicerIframe').style.width = `\${popupWidth}px`;
  });
});
