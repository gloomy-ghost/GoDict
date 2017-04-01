/*Page work javascript for processing the result from `bing` online dictionary.
*/
let result = "";

do {
    const qdef = document.getElementsByClassName("qdef")[0];
    if(qdef === undefined)
        break;

    const resList = qdef.getElementsByTagName("ul")[0];
    if(resList === undefined)
        break;

    let resultElem = document.createElement("div");
    resultElem.appendChild(resList); // This is the basic result.
    const hdDiv1 = qdef.getElementsByClassName("hd_div1")[0]; // The additional info.
    if(hdDiv1)
        resultElem.appendChild(hdDiv1);
    result = resultElem.outerHTML;
} while(0); // User "do{} while(0)" to mimic the "goto".

self.port.emit("onGetResult", result);
