const mainPanel = require("./main-panel.js"); // Include `main-panel` module.
const { ToggleButton } = require("sdk/ui/button/toggle"); // Require toggle button in toolbar.

const button = ToggleButton({
	id: "GoDictionary",
	label: "趣查 GoDictionary",
	icon:{
		"16": "./icon/icon-16.png", // `./` is a must here.
		"24": "./icon/icon-24.png",
		"32": "./icon/icon-32.png",
		"48": "./icon/icon-48.png",
		"64": "./icon/icon-64.png"
	},
	onClick: handleClick
	});

function handleClick() {
	mainPanel.show(); // Show the main panel when user click the button.
}

/**
 * This function returns the `button` object of the toolbar button.
 */
const self = () => button;
exports.self = self;