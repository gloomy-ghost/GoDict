const inputText = document.getElementById("text-box"),
	goSearchButton = document.getElementById("go-search-btn"),
	result = document.getElementById("result-content"),
	loadingSpinner = document.getElementById("loading-spinner"),
	dictIcon = document.getElementById("dict-icon"),
	listItemYoudao = document.getElementById("youdao"),
	listItemBing = document.getElementById("bing"),
	listItemIciba = document.getElementById("iciba");

window.onload = () => {
	browser.runtime.sendMessage({ action: 'getSearch' })
		.then((search) => {
			dictIcon.style.backgroundImage = 'url("ico/favicon-' + search +'.ico")';
		});
	browser.runtime.sendMessage({ action: 'getLast' })
		.then((last) => {
			inputText.value = last;
			doSearch()
		});
}

const clearResultContent = () => {
	while (result.hasChildNodes()) {
		result.removeChild(result.lastChild);
	}
}

const pauseLoaingSpinner = () => {
	loadingSpinner.style.display = "block";
	loadingSpinner.style.marginTop = "118px";
	loadingSpinner.style.height = "24px";
	let divs = loadingSpinner.getElementsByTagName("div");
	for (let i = divs.length - 1; i >= 0; --i) {
		divs[i].style.animationDuration = "0s";
	}
}

const restoreLoaingSpinner = () => {
	loadingSpinner.style.display = "block";
	loadingSpinner.style.marginTop = "100px";
	loadingSpinner.style.height = "60px";
	let divs = loadingSpinner.getElementsByTagName("div");
	for (let i = divs.length - 1; i >= 0; --i) {
		divs[i].style.animationDuration = "1.2s";
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
	elem.setAttribute("id", "error");
	elem.appendChild(document.createTextNode("请输入需要查询的单词！"));
	clearResultContent();
	result.appendChild(elem);
}

const doSearch = () => {
	let searchText = inputText.value;
	if (searchText) {
		showSearchProgress();
		browser.runtime.sendMessage({ action: 'search', data: searchText })
			.then((resultJSON) => {
				loadingSpinner.style.display = "none"; // Hide loading spinner.
				if (resultJSON['data'])
					showFoundResult(resultJSON['data']);
				else
					showNotFoundResult();
				inputText.select();
			});
	}
	else {
		warnEmptyInput();
	}
}

const showNotFoundResult = () => {
	let elem = document.createElement("h4");
	elem.setAttribute("id", "error");
	elem.appendChild(document.createTextNode("抱歉，未找到相匹配的结果"));
	elem.appendChild(document.createElement("br"));
	elem.appendChild(document.createTextNode("请试试其他词典吧～"));
	clearResultContent();
	result.appendChild(elem);
}

const showFoundResult = (resultJSON) => {
	const resultUL = document.createElement("ul");
	for (const row of resultJSON) {
		const li = document.createElement("li");
		li.appendChild(document.createTextNode(row));
		resultUL.appendChild(li);
	}
	clearResultContent();
	result.appendChild(resultUL);
}

listItemYoudao.onclick = function (event) {
	dictIcon.style.backgroundImage = 'url("ico/favicon-youdao.ico")';
	browser.runtime.sendMessage({ action: 'changeSearch', data: 'youdao' })
	doSearch();
}

listItemBing.onclick = function (event) {
	dictIcon.style.backgroundImage = 'url("ico/favicon-bing.ico")';
	browser.runtime.sendMessage({ action: 'changeSearch', data: 'bing' })
	doSearch();
}

listItemIciba.onclick = function (event) {
	dictIcon.style.backgroundImage = 'url("ico/favicon-iciba.ico")';
	browser.runtime.sendMessage({ action: 'changeSearch', data: 'iciba' })
	doSearch();
}

inputText.onkeyup = function (event) {
	if (event.keyCode == 13) // If "Enter" key.
		doSearch();
}

goSearchButton.onclick = function () {
	doSearch();
}
