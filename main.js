browser.contextMenus.create({
  id: "search",
  title: "趣查一下",
  contexts: ["all"],
  command: "_execute_browser_action"
});

const searchDict = {
  'youdao': function youdao(query, sendResponse) {
    const url = 'https://fanyi.youdao.com/openapi.do?keyfrom=GoDict-WE&key=275097059&type=data&doctype=json&version=1.1&only=dict&q=',
      request = new XMLHttpRequest();
    request.open('GET', url + query, true);
    request.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        const data = JSON.parse(this.response);
        try {
          sendResponse({ data: data['basic']['explains'] });
        }
        catch (TypeError) {
          sendResponse({ error: 'APIError' });
        }
      }
    };
    request.send();
  },

  'iciba': function iciba(query, sendResponse) {
    const url = 'http://dict-co.iciba.com/api/dictionary.php?type=json&key=B85227A12FE41E40E87196159763E918&w=',
      request = new XMLHttpRequest();
    request.open('GET', url + query, true);
    request.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        const data = JSON.parse(this.response);
        let result = [];
        try {
          for (const part of data['symbols'][0]['parts'])
            result.push(part.part + ' ' + part['means'].join(', '));
        }
        catch (TypeError) {
          sendResponse({ error: 'APIError' });
        }
        sendResponse({ data: result });
      }
    };
    request.send();
  },

  'bing': function bing(query, sendResponse) {
    const url = 'https://xtk.azurewebsites.net/BingDictService.aspx?Word=',
      request = new XMLHttpRequest();

    request.open('GET', url+query, true);
    request.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        const data = JSON.parse(this.response);
        let result = [];
        try {
          for (const def of data['defs'])
            result.push(def.pos + ' ' + def.def);
        }
        catch (TypeError) {
          sendResponse({ error: 'APIError' });
        }
        sendResponse({ data: result });
      }
    };
    request.send();
  },
}

var last = '';
localStorage['search'] = localStorage['search'] || 'youdao'
browser.contextMenus.onClicked.addListener(
  (info) => {
    last = info.selectionText;
  }
)


browser.runtime.onMessage.addListener(
  (message, sender, sendResponse) => {
    switch (message.action) {
      case 'getLast':
        sendResponse(last);
        break;
      case 'getSearch':
        sendResponse(localStorage['search']);
        break;
      case 'changeSearch':
        localStorage['search'] = message.data;
      default:
        last = message.data;
        searchDict[localStorage.search](message.data, sendResponse);
        return true;
    }
  }
)