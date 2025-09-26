// Initialize extension
function init() {
    // Load CSS styles
    injectCssIfNeeded();

    // Create floating button
    createFloatingButton();

    // Start auto-reconnect if enabled
    if (isExtensionActive()) {
        startAutoReconnect();
    }
}

// Start when page loads
window.addEventListener("load", () => {
    setTimeout(init, 0);
});