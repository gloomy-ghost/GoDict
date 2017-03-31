/*Page work javascript for processing the result from `bing` online dictionary.
*/
let result = "";

do {
	const rsArea = document.getElementsByClassName("rs_area");
	if(rsArea.length < 1)
		break;

	const leftArea = rsArea[0].getElementsByClassName("lf_area");
	if(leftArea.length < 1)
		break;

	const qdef = leftArea[0].getElementsByClassName("qdef");
	if(qdef.length < 1)
		break;

	const resList = qdef[0].getElementsByTagName("ul");
	if(resList.length < 1)
		break;

	let resultElem = document.createElement("div");
	resultElem.appendChild(resList[0]); // This is the basic result.
	const hdDiv1 = qdef[0].getElementsByClassName("hd_div1"); // The additional info.
	if(hdDiv1.length > 0)
		resultElem.appendChild(hdDiv1[0]);
	result = resultElem.outerHTML;
} while(0); // User "do{} while(0)" to mimic the "goto".

self.port.emit("onGetResult", result);