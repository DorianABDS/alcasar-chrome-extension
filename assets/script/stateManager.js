import { showToast } from './toast.js';

let reconnectInterval = null;
let autoReconnectFunction = null;
let CHECK_INTERVAL_MS = 2000;

// Setter to avoid circular import
export function setAutoReconnectFunction(func, interval) {
    autoReconnectFunction = func;
    CHECK_INTERVAL_MS = interval;
}

// Check if extension should work
export function isExtensionActive() {
    return localStorage.getItem('autoReconnectActive') !== 'false';
}

// Start automatic reconnection
export function startAutoReconnect() {
    if (reconnectInterval || !autoReconnectFunction) return; // Already started or no function

    autoReconnectFunction(); // Immediate execution
    reconnectInterval = setInterval(() => {
        autoReconnectFunction();
    }, CHECK_INTERVAL_MS);

    console.log("Auto-reconnect started");
}

// Stop automatic reconnection
export function stopAutoReconnect() {
    if (reconnectInterval) {
        clearInterval(reconnectInterval);
        reconnectInterval = null;
        console.log("Auto-reconnect stopped");
    }
}

// Toggle ON/OFF extension
export function toggleExtension(button) {
    const isActive = isExtensionActive();

    if (isActive) {
        // Disable extension
        localStorage.setItem('autoReconnectActive', 'false');
        stopAutoReconnect();
        showToast("ALCASAR auto-reconnect disabled");
    } else {
        // Enable extension
        localStorage.setItem('autoReconnectActive', 'true');
        startAutoReconnect();
        showToast("ALCASAR auto-reconnect enabled");
    }

    updateButtonState(button);
}

// Dynamic import to avoid circularity
let updateButtonStateFunc = null;
export function setUpdateButtonStateFunction(func) {
    updateButtonStateFunc = func;
}

function updateButtonState(button) {
    if (updateButtonStateFunc) {
        updateButtonStateFunc(button);
    }
}