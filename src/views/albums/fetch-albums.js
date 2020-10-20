export default function get_albums() {
  return fetch('censored-url-to-api')
    .then(r => r.json())
    .then(({ albums }) => albums);
}