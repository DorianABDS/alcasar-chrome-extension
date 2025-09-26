/* exported injectCssIfNeeded */

// Inject CSS styles into page
function injectCssIfNeeded() { // eslint-disable-line no-unused-vars
    // Check if already injected
    if (!document.getElementById('auto-reconnect-style')) {
        // Create CSS link element
        const style = document.createElement('link');
        style.id = 'auto-reconnect-style';
        style.rel = 'stylesheet';
        style.type = 'text/css';
        style.href = chrome.runtime.getURL('assets/css/styles.css');

        // Add to page head
        document.head.appendChild(style);
    }
}