// Raja Browser का जादुई इंजन (Service Worker)

self.addEventListener('install', (e) => {
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(self.clients.claim());
});

// यह कोड हर 1 मिनट में आपके GitHub से नया मैसेज चेक करेगा
setInterval(() => {
    fetch('notify-control.json')
    .then(response => response.json())
    .then(data => {
        // अगर status "on" है, तभी नोटिफिकेशन दिखेगा
        if(data.status === "on") {
            self.registration.showNotification(data.title, {
                body: data.body,
                icon: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
                badge: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
                tag: 'raja-notif-tag', // एक ही मैसेज बार-बार न आए इसलिए टैग
                renotify: false
            });
        }
    })
    .catch(err => console.log("Checking for updates..."));
}, 60000); // 60000 मिलीसेकंड यानी 1 मिनट
