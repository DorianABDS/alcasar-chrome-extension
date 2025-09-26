// Injection of CSS styles
function injectCssIfNeeded() {
    if (!document.getElementById('auto-reconnect-style')) {
        const style = document.createElement('link');
        style.id = 'auto-reconnect-style';
        style.rel = 'stylesheet';
        style.type = 'text/css';
        style.href = chrome.runtime.getURL('/assets/css/styles.css');
        document.head.appendChild(style);
    }
}