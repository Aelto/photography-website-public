if ('serviceWorker' in navigator) {
  let application_public_key = '';

  function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  function get_vapid_public_key() {
    return fetch('censored-url-to-api')
    .then(res => res.text());
  }

  function subscribe_user(public_key) {
    console.log(`service worker register, subscribing to notifications service`);
    const applicationServerKey = urlB64ToUint8Array(public_key);
    
    return window.service_worker_registration
    .pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
    .then(subscription => {
      fetch('censored-url-to-api', {
        method: 'post',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(subscription)
      })
    });
  }

  navigator.serviceWorker.register('/service-worker.js')
  .then(swReg => window.service_worker_registration = swReg)
  .then(get_vapid_public_key)
  .then(subscribe_user)
  .catch(err => {
    console.error('service worker errorr', err);
  })
}
else {
  console.log(`service worker and push manager not supported`);
}