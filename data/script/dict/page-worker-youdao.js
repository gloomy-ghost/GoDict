/*Page work javascript for processing the result from `youdao` online dictionary.
*/
let result = "";

do {
	const resultContents = document.getElementById("results-contents");
	if(resultContents == null)
		break;

	const transWrapper = resultContents.getElementsByClassName("trans-wrapper clearfix");
	if (transWrapper.length > 0) {
		const transContainers = transWrapper[0].getElementsByClassName("trans-container");
		if (transContainers.length > 0) {
			const resList=transContainers[0].getElementsByTagName("ul");
			if(resList.length > 0) {
				result = resList[0].outerHTML;
				break;
			}
		}
	}
	const errorWrapper = resultContents.getElementsByClassName("error-wrapper");
	if (errorWrapper.length > 0) {
		const errorTypo = errorWrapper[0].getElementsByClassName("error-typo");
		if (errorTypo.length > 0) {
			result = errorTypo[0].outerHTML;
		}
	}
} while(0); // User "do{} while(0)" to mimic the "goto".

self.port.emit("onGetResult", result);