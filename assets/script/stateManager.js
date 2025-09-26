let reconnectInterval = null;

// Check if extension should work
function isExtensionActive() {
    return localStorage.getItem('autoReconnectActive') !== 'false';
}

// Start automatic reconnection
function startAutoReconnect() {
    if (reconnectInterval) return;

    autoReconnect();
    reconnectInterval = setInterval(() => {
        autoReconnect();
    }, CHECK_INTERVAL_MS);

    console.log("Auto-reconnect started");
}

// Stop automatic reconnection
function stopAutoReconnect() {
    if (reconnectInterval) {
        clearInterval(reconnectInterval);
        reconnectInterval = null;
        console.log("Auto-reconnect stopped");
    }
}

// Toggle ON/OFF extension
function toggleExtension(button) {
    const isActive = isExtensionActive();

    if (isActive) {
        // Disable extension
        localStorage.setItem('autoReconnectActive', 'false');
        stopAutoReconnect();
        showToast("🔴 Extension désactivée");
    } else {
        // Enable extension
        localStorage.setItem('autoReconnectActive', 'true');
        startAutoReconnect();
        showToast("🟢 Extension activée");
    }

    updateButtonState(button);
}