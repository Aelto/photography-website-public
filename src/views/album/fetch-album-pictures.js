export default function get_album_pictures(album_id_number) {
  return fetch('censored-url-to-api')
    .then(r => r.json())
    .then(({ pictures }) => pictures);
}
