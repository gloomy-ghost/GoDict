const inputText = document.getElementById("text-box");
const goSearchButton = document.getElementById("go-search-btn");
const result = document.getElementById("result-content");
const loadingSpinner = document.getElementById("loading-spinner");
const dictIcon = document.getElementById("dict-icon");
const listItemYoudao = document.getElementById("youdao");
const listItemBing = document.getElementById("bing");
const listItemIciba = document.getElementById("iciba");
const parser = new DOMParser();


const clearResultContent = () => {
	while (result.hasChildNodes()) {
		result.removeChild(result.lastChild);
	}
}

const pauseLoaingSpinner = () => {
	loadingSpinner.style.display="block";
	loadingSpinner.style.marginTop="118px";
	loadingSpinner.style.height="24px";
	let divs = loadingSpinner.getElementsByTagName("div");
	for (let i=divs.length-1; i >= 0; --i) {
		divs[i].style.animationDuration="0s";
	}
}

const restoreLoaingSpinner = () => {
	loadingSpinner.style.display="block";
	loadingSpinner.style.marginTop="100px";
	loadingSpinner.style.height="60px";
	let divs = loadingSpinner.getElementsByTagName("div");
	for (let i=divs.length-1; i >= 0; --i) {
		divs[i].style.animationDuration="1.2s";
	}
}
const showSearchProgress = () => {
	restoreLoaingSpinner();
	let elem = document.createElement("p");
	elem.setAttribute("id", "loading");
	elem.appendChild(document.createTextNode("努力查询中..."));
	clearResultContent();
	result.appendChild(elem);
}

const warnEmptyInput = () => {
	pauseLoaingSpinner();
	let elem = document.createElement("p");
	elem.setAttribute("id", "error-empty-input");
	elem.appendChild(document.createTextNode("请输入需要查询的单词！"));
	clearResultContent();
	result.appendChild(elem);
}

const loadCSSFile = (filename) => {
	let fileref = document.createElement("link");
	fileref.setAttribute("rel", "stylesheet");
	fileref.setAttribute("type", "text/css");
	fileref.setAttribute("href", filename);
	document.getElementsByTagName("head")[0].appendChild(fileref);
}

const doSearch = () => {
	let searchText = inputText.value;
	if(searchText) {
		self.port.emit("onGoSearch", searchText);
		showSearchProgress();
	}
	else {
		warnEmptyInput();
	}
}

const showNotFoundResult = () => {
	let elem = document.createElement("h4");
	elem.setAttribute("id", "error-not-found");
	elem.appendChild(document.createTextNode("抱歉，未找到相匹配的结果"));
	elem.appendChild(document.createElement("br"));
	elem.appendChild(document.createTextNode("请试试其他词典吧～"));
	clearResultContent();
	result.appendChild(elem);
}

const showFoundResult = (resultHTML) => {
		const doc = parser.parseFromString(resultHTML, "text/html");
		clearResultContent();
		result.appendChild(doc.body.children[0]);
	}

self.port.on("onInit", function(){
	dictIcon.style.backgroundImage='url("favicon-youdao.ico")';
	loadCSSFile("result-youdao.css");
});

self.port.on("onShow", function(){
	if(!inputText.value)
		warnEmptyInput();
});

self.port.on("onUpdateInputText", function(selectionText){
	inputText.value = selectionText;
	doSearch();
});

self.port.on("onHide", function(){
	inputText.value = ""; // Reset the content.
	loadingSpinner.style.display="none"; // Hide loading spinner.
	clearResultContent();
});

self.port.on("onUpdateSearchResult", function(resultHTML){
	loadingSpinner.style.display="none"; // Hide loading spinner.
	if(!resultHTML)
		showNotFoundResult();
	else
		showFoundResult(resultHTML);
	inputText.select();
});

listItemYoudao.onclick=function(event) {
	dictIcon.style.backgroundImage='url("favicon-youdao.ico")';
	loadCSSFile("result-youdao.css");
	self.port.emit("onSelectYoudao");
	doSearch();
}

listItemBing.onclick=function(event) {
	dictIcon.style.backgroundImage='url("favicon-bing.ico")';
	loadCSSFile("result-bing.css");
	self.port.emit("onSelectBing");
	doSearch();
}

listItemIciba.onclick=function(event) {
	dictIcon.style.backgroundImage='url("favicon-iciba.ico")';
	loadCSSFile("result-iciba.css");
	self.port.emit("onSelectIciba");
	doSearch();
}

inputText.onkeyup=function(event) {
	if (event.keyCode == 13) // If "Enter" key.
		doSearch();
}

goSearchButton.onclick=function() {
	doSearch();
}
