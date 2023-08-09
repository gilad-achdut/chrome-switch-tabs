// Keep track of the last two active tabs
var lastActiveTabs = [];

chrome.tabs.onActivated.addListener(function(activeInfo) {
  var currentTabId = activeInfo.tabId;

  // Remove the current tab from the list (if it exists)
  lastActiveTabs = lastActiveTabs.filter(tabId => tabId !== currentTabId);

  // Add the current tab to the beginning of the list
  lastActiveTabs.unshift(currentTabId);

  // Limit the list to the last two tabs
  if (lastActiveTabs.length > 2) {
    lastActiveTabs.pop();
  }
});

chrome.commands.onCommand.addListener(function(command) {
  if (command === "switch-last") {
    // Switch to the second-to-last active tab (if available)
    if (lastActiveTabs.length > 1) {
      var tabIdToSwitch = lastActiveTabs[1];
      chrome.tabs.update(tabIdToSwitch, { active: true });
    }
  }
});
