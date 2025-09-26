import { injectCssIfNeeded } from './cssInjector.js';
import { createFloatingButton, updateButtonState } from './floatingButton.js';
import { startAutoReconnect, isExtensionActive, setAutoReconnectFunction, setUpdateButtonStateFunction } from './stateManager.js';
import { autoReconnect, CHECK_INTERVAL_MS } from './autoReconnect.js';

// Extension initialization
function init() {
    // Configure functions to avoid circular imports
    setAutoReconnectFunction(autoReconnect, CHECK_INTERVAL_MS);
    setUpdateButtonStateFunction(updateButtonState);

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