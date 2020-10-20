export default async function fetch_users() {
  const res = await fetch('censored-url-to-api');
  const { users } = await res.json();

  return users;
}