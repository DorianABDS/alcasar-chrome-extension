/* global toggleExtension, isExtensionActive */
/* exported createFloatingButton, updateButtonState */

// Drag and drop variables
let isDragging = false;
let dragStartTime = 0;
let startX, startY, offsetX, offsetY;

// Create floating button
function createFloatingButton() { // eslint-disable-line no-unused-vars
    // Skip if button already exists
    if (document.getElementById('floating-btn')) {
        return;
    }

    // Create button element
    const button = document.createElement('button');
    button.id = 'floating-btn';
    button.className = 'btn-floating';

    // Create logo image
    const logo = document.createElement('img');
    logo.src = chrome.runtime.getURL('assets/icons/alcasar.png');
    logo.alt = 'ALCASAR';
    logo.className = 'logo-floating';
    button.appendChild(logo);

    // Set initial state
    updateButtonState(button);

    // Enable drag and drop
    makeDraggable(button);

    // Handle mouse down for drag detection
    button.addEventListener('mousedown', () => {
        isDragging = false;
        dragStartTime = Date.now();
    });

    // Handle click vs drag
    button.addEventListener('click', () => {
        // Only toggle if not dragging and quick click
        if (!isDragging && (Date.now() - dragStartTime) < 200) {
            toggleExtension(button);
        }
    });

    // Add button to page
    document.body.appendChild(button);
}

// Make button draggable
function makeDraggable(element) {
    // Add drag event listener
    element.addEventListener('mousedown', onMouseDown);

    // Restore saved position
    restoreButtonPosition(element);
    element.style.cursor = 'grab';
}

// Handle mouse down event
function onMouseDown(e) {
    const element = e.currentTarget;
    isDragging = false;

    // Store initial positions
    startX = e.clientX;
    startY = e.clientY;
    const rect = element.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    // Update cursor and disable transitions
    element.style.cursor = 'grabbing';
    element.style.transition = 'none';

    // Add global event listeners
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    e.preventDefault();
}

// Handle mouse move event
function onMouseMove(e) {
    const element = document.getElementById('floating-btn');
    if (!element) return;

    // Calculate movement distance
    const moveDistance = Math.sqrt(
        Math.pow(e.clientX - startX, 2) + Math.pow(e.clientY - startY, 2)
    );

    // Start dragging if moved enough
    if (moveDistance > 3) {
        isDragging = true;

        // Calculate new position
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        // Keep button within screen bounds
        const padding = 10;
        const maxX = window.innerWidth - element.offsetWidth - padding;
        const maxY = window.innerHeight - element.offsetHeight - padding;

        const clampedX = Math.max(padding, Math.min(x, maxX));
        const clampedY = Math.max(padding, Math.min(y, maxY));

        // Update position
        element.style.left = clampedX + 'px';
        element.style.top = clampedY + 'px';
        element.style.right = 'auto';
        element.style.bottom = 'auto';
        element.style.transform = 'none';

        // Save position
        localStorage.setItem('floatingButtonX', clampedX);
        localStorage.setItem('floatingButtonY', clampedY);
    }
}

// Handle mouse up event
function onMouseUp() {
    const element = document.getElementById('floating-btn');
    if (!element) return;

    // Restore cursor and transitions
    element.style.cursor = 'grab';
    element.style.transition = 'all 0.2s ease';

    // Remove global event listeners
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    // Prevent click after drag
    if (isDragging) {
        setTimeout(() => {
            isDragging = false;
        }, 100);
    }
}

// Restore button position from storage
function restoreButtonPosition(element) {
    // Get saved position
    const savedX = localStorage.getItem('floatingButtonX');
    const savedY = localStorage.getItem('floatingButtonY');

    // Apply saved position if exists
    if (savedX && savedY) {
        element.style.left = savedX + 'px';
        element.style.top = savedY + 'px';
        element.style.right = 'auto';
        element.style.bottom = 'auto';
    }
}

// Update button visual state
function updateButtonState(button) {
    const isActive = isExtensionActive();
    const logo = button.querySelector('.logo-floating');

    // Set logo opacity
    logo.style.opacity = '1';
    button.style.backgroundColor = '#f5f5f5';
    button.style.borderColor = '#d4b59f';

    // Get or create status pin
    let statusPin = button.querySelector('.status-pin');
    if (!statusPin) {
        statusPin = document.createElement('div');
        statusPin.className = 'status-pin';
        button.appendChild(statusPin);
    }

    // Update pin color and tooltip
    if (isActive) {
        statusPin.style.backgroundColor = '#4caf50';
        button.title = '🟢 Auto-connexion Alcasar ACTIVÉ\n• Clic pour désactiver\n• Glisser pour déplacer';
    } else {
        statusPin.style.backgroundColor = '#f44336';
        button.title = '🔴 Auto-connexion Alcasar DÉSACTIVÉ\n• Clic pour activer\n• Glisser pour déplacer';
    }
}