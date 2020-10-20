export default function fetch_album_cover(album_id) {
  return fetch('censored-url-to-api')
    .then(r => r.json())
    .then(({ picture }) => picture);
}