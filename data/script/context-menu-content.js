/*
As an alternative to port, content modules support the built-in message event.
In most cases port is preferable to message events.
However, the context-menu module does not support port,
so to send messages from a content script to the add-on via a context menu object,
you must use message events.
*/
self.on("click", function() {
	self.postMessage();
});

self.on("context", function() {
	let selectionText = window.getSelection().toString();
	const TEXT_LEN_MAX = 15;
	if (selectionText.length > TEXT_LEN_MAX)
		selectionText = selectionText.substr(0, TEXT_LEN_MAX) + "...";
	return '趣查一下 "'+ selectionText + '"';
});