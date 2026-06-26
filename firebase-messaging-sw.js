importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAXOvpj1ogIeldTKn4XFE2ljm045AkANLM",
  authDomain: "spark-app-a98fa.firebaseapp.com",
  projectId: "spark-app-a98fa",
  storageBucket: "spark-app-a98fa.firebasestorage.app",
  messagingSenderId: "841144242877",
  appId: "1:841144242877:web:13dd932f7a092f9d161dd4"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification || {};
  if (!title) return;
  self.registration.showNotification(title, {
    body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [100, 50, 100, 50, 100],
    tag: payload.data?.type || 'spark',
    renotify: true,
    actions: [
      { action: 'open', title: '💧 Open Spark' },
      { action: 'dismiss', title: 'Later' }
    ]
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'dismiss') return;
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow('/');
    })
  );
});