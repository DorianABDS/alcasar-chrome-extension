/* exported showToast */

// Show notification message
function showToast(message) { // eslint-disable-line no-unused-vars
    // Create toast element
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.className = "toast-floating";

    // Add to page
    document.body.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}