const dictYoudao = require("data/script/dict/youdao.js");
const dictBing = require("data/script/dict/bing.js");
const dictIciba = require("data/script/dict/iciba.js");
const data = require("sdk/self").data;
const panels = require("sdk/panel");

let toolbarButton = undefined;
let currDict = undefined;

// Construct a panel. loading its content from the "html/main-panel.html"
// file in the "data" directory, and loading the "script/main-panel-content.js" script into it.
const mainPanel = panels.Panel(
	{
		contentURL: data.url("html/main-panel.html"), // The panel content itself, specified as HTML.
		contentScriptFile: data.url("script/main-panel-content.js"), // The content script that interacts with the panel content.
		onShow: handleShow,
		onHide: handleHide
	});
function handleShow() {
	mainPanel.port.emit("onShow");
}
function handleHide() {
	toolbarButton.state('window', {checked:false});
	mainPanel.port.emit("onHide");
}

mainPanel.port.on("onGoSearch", function (searchText){
	currDict.search(searchText);
});
mainPanel.port.on("onSelectYoudao", function (){
	currDict = dictYoudao;
});
mainPanel.port.on("onSelectBing", function (){
	currDict = dictBing;
});
mainPanel.port.on("onSelectIciba", function (){
	currDict = dictIciba;
});

/**
 * This function does the initialization job.
 * @param {Object} toolbarButton_
 *    The toolbar button object which serves as the position of the main panel.
 */
const init = (toolbarButton_) => {
	toolbarButton = toolbarButton_;
	currDict = dictYoudao; // @TODO User config the default dict.
	mainPanel.port.emit("onInit");
}
exports.init = init;

/**
 * This function shows the main panel.
 */
const show = () => {
	var worker = require("sdk/tabs").activeTab.attach({
		contentScript: "self.port.emit('onGetSelectionText', window.getSelection().toString());"
	});
  worker.port.on("onGetSelectionText", function (selectionText){
	  if(selectionText)
	  	mainPanel.port.emit("onUpdateInputText", selectionText);
	});
	mainPanel.resize(336, 360);
	mainPanel.show({position: toolbarButton});
}
exports.show = show;

/**
 * This function emit message to the main panel content javascript to update 
  the search result.
 * @param {String} resultHTML
 *    The search result string in HTML format.
 */
const updateSearchResult = (resultHTML) => {
	mainPanel.port.emit("onUpdateSearchResult", resultHTML);
}
exports.updateSearchResult = updateSearchResult;