// Variables globales pour le drag
let isDragging = false;
let dragStartTime = 0;
let startX, startY, offsetX, offsetY;

function createFloatingButton() {
    // Check if the button already exists
    if (document.getElementById('floating-btn')) {
        return;
    }

    const button = document.createElement('button');
    button.id = 'floating-btn';
    button.className = 'btn-floating';

    // Logo in the button
    const logo = document.createElement('img');
    logo.src = chrome.runtime.getURL('assets/icons/alcasar.webp');
    logo.alt = 'ALCASAR';
    logo.className = 'logo-floating';
    button.appendChild(logo);

    // Check initial state
    updateButtonState(button);

    // Make button draggable
    makeDraggable(button);

    // toggle ON/OFF on click
    button.addEventListener('mousedown', () => {
        isDragging = false;
        dragStartTime = Date.now();
    });

    button.addEventListener('click', (e) => {
        // Only toggle if not dragging and click was quick
        if (!isDragging && (Date.now() - dragStartTime) < 200) {
            toggleExtension(button);
        }
    });

    document.body.appendChild(button);
}

function makeDraggable(element) {
    element.addEventListener('mousedown', onMouseDown);

    // Restore saved position
    restoreButtonPosition(element);
    element.style.cursor = 'grab';
}

function onMouseDown(e) {
    const element = e.currentTarget;
    isDragging = false;
    startX = e.clientX;
    startY = e.clientY;
    const rect = element.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    element.style.cursor = 'grabbing';
    element.style.transition = 'none';

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    e.preventDefault();
}

function onMouseMove(e) {
    const element = document.getElementById('floating-btn');
    if (!element) return;

    const moveDistance = Math.sqrt(
        Math.pow(e.clientX - startX, 2) + Math.pow(e.clientY - startY, 2)
    );

    if (moveDistance > 3) { // Reduced threshold for more responsive drag
        isDragging = true;
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        // Keep button within screen bounds with padding
        const padding = 10;
        const maxX = window.innerWidth - element.offsetWidth - padding;
        const maxY = window.innerHeight - element.offsetHeight - padding;

        const clampedX = Math.max(padding, Math.min(x, maxX));
        const clampedY = Math.max(padding, Math.min(y, maxY));

        element.style.left = clampedX + 'px';
        element.style.top = clampedY + 'px';
        element.style.right = 'auto';
        element.style.bottom = 'auto';
        element.style.transform = 'none';

        // Save position in real-time
        localStorage.setItem('floatingButtonX', clampedX);
        localStorage.setItem('floatingButtonY', clampedY);
    }
}

function onMouseUp() {
    const element = document.getElementById('floating-btn');
    if (!element) return;

    element.style.cursor = 'grab';
    element.style.transition = 'all 0.2s ease'; // Restore transition
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    // Small delay to prevent click after drag
    if (isDragging) {
        setTimeout(() => {
            isDragging = false;
        }, 100);
    }
}

function restoreButtonPosition(element) {
    const savedX = localStorage.getItem('floatingButtonX');
    const savedY = localStorage.getItem('floatingButtonY');

    if (savedX && savedY) {
        element.style.left = savedX + 'px';
        element.style.top = savedY + 'px';
        element.style.right = 'auto';
        element.style.bottom = 'auto';
    }
}

function updateButtonState(button) {
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
        button.title = '🟢 Auto-connexion Alcasar ACTIVÉ\n• Clic pour désactiver\n• Glisser pour déplacer';
    } else {
        statusPin.style.backgroundColor = '#f44336';
        button.title = '🔴 Auto-connexion Alcasar DÉSACTIVÉ\n• Clic pour activer\n• Glisser pour déplacer';
    }
}