export default async function fetch_photos() {
  const res = await fetch('censored-url-to-api');
  const { photos } = await res.json();

  return photos;
}