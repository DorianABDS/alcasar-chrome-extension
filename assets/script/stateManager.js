// Store reconnection interval
let reconnectInterval = null;

// Check if extension is active
function isExtensionActive() {
    return localStorage.getItem('autoReconnectActive') !== 'false';
}

// Start automatic reconnection
function startAutoReconnect() {
    // Skip if already running
    if (reconnectInterval) return;

    // Run immediately then set interval
    autoReconnect();
    reconnectInterval = setInterval(() => {
        autoReconnect();
    }, CHECK_INTERVAL_MS);

    console.log("Auto-reconnect started");
}

// Stop automatic reconnection
function stopAutoReconnect() {
    // Clear interval if exists
    if (reconnectInterval) {
        clearInterval(reconnectInterval);
        reconnectInterval = null;
        console.log("Auto-reconnect stopped");
    }
}

// Toggle extension on/off
function toggleExtension(button) {
    const isActive = isExtensionActive();

    if (isActive) {
        // Disable extension
        localStorage.setItem('autoReconnectActive', 'false');
        stopAutoReconnect();
        showToast("🔴 Extension désactivé");
    } else {
        // Enable extension
        localStorage.setItem('autoReconnectActive', 'true');
        startAutoReconnect();
        showToast("🟢 Extension activé");
    }

    // Update button appearance
    updateButtonState(button);
}