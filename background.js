chrome.action.onClicked.addListener(() => {
  chrome.storage.sync.get('popupWidth', (data) => {
    const popupWidth = data.popupWidth || 640;
    console.log('Retrieved popupWidth:', popupWidth);

    chrome.windows.create({
      url: 'popup.html',
      type: 'popup',
      width: popupWidth,
      height: 550
    });
  });
});
