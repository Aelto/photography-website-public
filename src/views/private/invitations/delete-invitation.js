export default async function delete_invitation(hash) {
  try {
    const res = await fetch('censored-url-to-api', {
      method: 'delete',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify({ hash })
    });
  }
  catch (err) {
    console.log(err);
    alert(err);
  }
}