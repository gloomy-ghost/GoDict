/*Page work javascript for processing the result from `iciba` online dictionary.
*/
let result = "";

do {
	const infoArticles = document.getElementsByClassName("info-article info-base")[0];
	if(infoArticles === undefined)
		break;

	const baseLists = infoArticles.getElementsByClassName("base-list switch_part")[0];
	if(baseLists)
		result = baseLists.outerHTML;
} while(0); // User "do{} while(0)" to mimic the "goto".

self.port.emit("onGetResult", result);
