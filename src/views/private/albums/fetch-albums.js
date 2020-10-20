/**
 * @returns {Promise<any>}
 */
export default function fetch_albums() {
  return fetch('censored-url-to-api')
  .then(r => r.json())
  .then(({ albums }) => albums);
}