var eventSourceURL = 'http://109.236.101.175:3000/listen';
var eventsNames    = [ 'initialized', 'buttonPressed' ];

chrome.extension.onMessage.addListener(function(message, 
                                                sender, 
                                                sendResponse) {
  var eventSource, eventName;
  if (message.initialized && message.type == 'contentScript') {
    chrome.pageAction.show(sender.tab.id);
    eventSource = new EventSource(eventSourceURL);
    for (var i = 0; i < eventsNames.length; i++) {
      eventName = eventsNames[i];
      eventSource.addEventListener(eventName, function(e) {
        console.log(e)
        chrome.tabs.sendMessage(sender.tab.id, { event: e.type, data: JSON.parse(e.data) });
      }, false);
    }
  }
});