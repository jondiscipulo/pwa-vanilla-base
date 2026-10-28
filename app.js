// --- 1. Register the Service Worker ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
} else {
    console.log('Service workers are not supported in this browser.');
}

// --- 2. Handle Online/Offline Status ---
const networkStatusEl = document.getElementById('network-status');

function updateOnlineStatus(event) {
    if (navigator.onLine) {
        networkStatusEl.textContent = 'Online';
        networkStatusEl.className = 'status-online';
    } else {
        networkStatusEl.textContent = 'Offline';
        networkStatusEl.className = 'status-offline';
    }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// Set initial state on load
updateOnlineStatus();
