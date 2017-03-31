/*Page work javascript for processing the result from `iciba` online dictionary.
*/
let result = "";

do {
	const resultInfos = document.getElementsByClassName("container-left");
	if(resultInfos.length < 1)
		break;

	const infoArticles = resultInfos[0].getElementsByClassName("info-article info-base");
	if(infoArticles.length < 1)
		break;

	const baseLists = infoArticles[0].getElementsByClassName("base-list switch_part");
	if(baseLists.length > 0)
		result = baseLists[0].outerHTML;
} while(0); // User "do{} while(0)" to mimic the "goto".

self.port.emit("onGetResult", result);
