import { toggleExtension, isExtensionActive } from './stateManager.js';

export function createFloatingButton() {
    // Check if the button already exists
    if (document.getElementById('floating-btn')) {
        return;
    }

    const button = document.createElement('button');
    button.id = 'floating-btn';
    button.className = 'btn-floating';

    // Logo in the button
    const logo = document.createElement('img');
    logo.src = chrome.runtime.getURL('/assets/images/alcasar-logo.png');
    logo.alt = 'ALCASAR';
    logo.className = 'logo-floating';
    button.appendChild(logo);

    // Check initial state
    updateButtonState(button);

    // Click = toggle ON/OFF extension
    button.addEventListener('click', () => {
        toggleExtension(button);
    });

    // Insert into page
    document.body.appendChild(button);
}

export function updateButtonState(button) {
    const isActive = isExtensionActive();
    const logo = button.querySelector('.logo-floating');

    // Image always stays the same
    logo.style.opacity = '1';
    button.style.backgroundColor = '#f5f5f5';
    button.style.borderColor = '#d4b59f';

    // Handle status pin
    let statusPin = button.querySelector('.status-pin');
    if (!statusPin) {
        statusPin = document.createElement('div');
        statusPin.className = 'status-pin';
        button.appendChild(statusPin);
    }

    if (isActive) {
        statusPin.style.backgroundColor = '#4caf50';
        button.title = 'Auto-reconnect ON - Click to disable';
    } else {
        statusPin.style.backgroundColor = '#999';
        button.title = 'Auto-reconnect OFF - Click to activate';
    }
}