self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

// नोटिफिकेशन पर क्लिक करने से आपकी साइट खुलेगी
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
});

// हर 60 सेकंड में GitHub चेक करना
setInterval(() => {
    fetch('notify-control.json?v=' + Math.random())
    .then(r => r.json())
    .then(data => {
        if(data.status === "on") {
            self.registration.showNotification(data.title, {
                body: data.body,
                icon: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
                badge: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
                tag: 'raja-msg',
                renotify: true
            });
        }
    }).catch(e => console.log("Searching..."));
}, 60000);
