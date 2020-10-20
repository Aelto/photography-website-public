export default async function create_invitation(email) {
  try {
    const res = await fetch('censored-url-to-api', {
      method: 'put',
      body: JSON.stringify({ email }),
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrer: 'no-referrer'
    });
  } catch (err) {
    alert(err);
  }
}