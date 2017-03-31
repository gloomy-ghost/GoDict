const data = require("sdk/self").data;
const mainPanel = require("lib/main-panel.js");
const pageWorkers = require("sdk/page-worker");

/**
 * This function invoke the search using `Bing` online dictionary.
  the search result.
 * @param {String} inputText
 *    The text string to be searched.
 */
const search = (inputText) => {
	if(inputText){
		const searchURL = "http://cn.bing.com/dict/?q=" + inputText + "&qs=n&form=Z9LH5&pq=" + inputText;
		const scriptFile = data.url("script/dict/page-worker-bing.js");
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