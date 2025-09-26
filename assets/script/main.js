// Extension initialization
function init() {
    // CSS injection
    injectCssIfNeeded();

    // Create floating button
    createFloatingButton();

    // Start auto-reconnect if enabled
    if (isExtensionActive()) {
        startAutoReconnect();
    }
}

// Launch on page load
window.addEventListener("load", () => {
    setTimeout(init, 0);
});