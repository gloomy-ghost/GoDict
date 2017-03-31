const data = require("sdk/self").data;
const mainPanel = require("lib/main-panel.js");
const pageWorkers = require("sdk/page-worker");

/**
 * This function invoke the search using `Youdao` online dictionary.
  the search result.
 * @param {String} inputText
 *    The text string to be searched.
 */
const search = (inputText) => {
	if(inputText){
		const searchURL = "http://dict.youdao.com/search?le=eng&q=" + inputText +"&keyfrom=dict.top";
		const scriptFile = data.url("script/dict/page-worker-youdao.js");
		const pageWorker = pageWorkers.Page({
		  contentURL: searchURL,
		  contentScriptFile: scriptFile,
		  contentScriptWhen: "ready"
		});
		pageWorker.port.on("onGetResult", function(resultHTML){
    		mainPanel.updateSearchResult(resultHTML);
		});
	}
}
exports.search = search;