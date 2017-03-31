require("./lib/context-menu.js"); // Include the `context-menu` module.
const toolbarButton = require("./lib/toolbar-button.js"); // Include the `toolbar-button` module.
const mainPanel = require("./lib/main-panel.js"); // Include the `main-panel` module.

mainPanel.init(toolbarButton.self()); // Do the initialization job.