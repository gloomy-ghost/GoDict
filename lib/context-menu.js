const mainPanel = require("./main-panel.js"); // Include the `main-panel` module.
const contextMenu = require("sdk/context-menu"); // Include the `context-menu` module.
const self = require("sdk/self");

const menuItem = contextMenu.Item({
	label: "Search Z-Dic",
	image: self.data.url("icon/icon-16.png"),
	context: contextMenu.SelectionContext(),
	contentScriptFile: self.data.url("script/context-menu-content.js"),
	onMessage: handleMessage
});

function handleMessage() {
  mainPanel.show();
}