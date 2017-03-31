const data = require("sdk/self").data;
const mainPanel = require("lib/main-panel.js");
const pageWorkers = require("sdk/page-worker");

/**
 * This function invoke the search using `Iciba` online dictionary.
  the search result.
 * @param {String} inputText
 *    The text string to be searched.
 */
const search = (inputText) => {
    if(inputText){
        const searchURL = "http://www.iciba.com/" + inputText;
        const scriptFile = data.url("script/dict/page-worker-iciba.js");
        const pageWorker = pageWorkers.Page({
            contentURL: searchURL,
            contentScriptFile: scriptFile,
            contentScriptWhen: "ready"
        });
        pageWorker.port.on("onGetResult", function(resultHTML){
            mainPanel.updateSearchResult(resultHTML);
            pageWorker.destroy();
        });
    }
}
exports.search = search;
