export default function fetch_album(album_id_number) {
  return fetch('censored-url-to-api')
    .then(r => r.json())
    .then(({ album }) => album);
}
