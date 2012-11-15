var tokenElement = document.querySelector('#token');

chrome.tabs.query({ windowId: chrome.windows.WINDOW_ID_CURRENT, 
                    active: true }, 
                  function(tabs) {
  var tab = tabs.pop();
  chrome.tabs.sendMessage(tab.id, 
                          { initialized: true, type: 'popup' }, 
                          function(message) {
    tokenElement.innerText = message.token;
  });
});
