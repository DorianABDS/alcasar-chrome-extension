// Toast notification system
export function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.className = "toast-floating";

    document.body.appendChild(toast);

    // Auto-disappear after 3s
    setTimeout(() => {
        toast.remove();
    }, 3000);
}