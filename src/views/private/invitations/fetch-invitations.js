export default async function fetch_invitations() {
  const res = await fetch('censored-url-to-api');
  const { invitations } = await res.json();

  return invitations;
}