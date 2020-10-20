export default function delete_album(id) {
  return fetch('censored-url-to-api', { method: 'delete' })
  .then(r => r.text());
}