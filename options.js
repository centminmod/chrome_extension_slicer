document.addEventListener('DOMContentLoaded', () => {
  const popupWidthInput = document.getElementById('popupWidth');
  const saveButton = document.getElementById('saveButton');
  const status = document.getElementById('status');

  // Load the saved width value
  chrome.storage.sync.get('popupWidth', (data) => {
    popupWidthInput.value = data.popupWidth || 600;
  });

  // Save the width value
  saveButton.addEventListener('click', () => {
    const widthValue = parseInt(popupWidthInput.value, 10);
    chrome.storage.sync.set({ popupWidth: widthValue }, () => {
      status.textContent = 'Options saved.';
      setTimeout(() => {
        status.textContent = '';
      }, 1000);
    });
  });
});