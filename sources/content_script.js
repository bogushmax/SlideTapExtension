var regexp = /svPlayerId/;

var token;

var nextButton     = document.querySelector('.btnNext');
var previousButton = document.querySelector('.btnPrevious');

var onInitialized = function(data) {
  token = data.token;
}

var onButtonPressed = function(data) {
  switch (data.action) {
    case 'nextSlide':
      console.log(data);
      nextButton.click();
    break;

    case 'previousSlide':
      previousButton.click();
    break;
  }
}

if(regexp.test(document.body.innerHTML)) {
  chrome.extension.sendMessage({initialized: true, type: 'contentScript'});
  chrome.extension.onMessage.addListener(function(message, _, sendResponse) {
    if (message.initialized && message.type == 'popup') {
      sendResponse({ token: token });
    } else {
      switch (message.event) {
        case 'initialized':
          onInitialized(message.data);
        break;

        case 'buttonPressed':
          console.log(message.data);
          onButtonPressed(message.data);
        break;
      }
    }
  });
}