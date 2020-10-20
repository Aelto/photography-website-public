const html = htm.bind(React.createElement);

export default function Nav() {
  return html`
    <nav>
      <a href="/private/users">users</a>
      <a href="/private/photos">photos</a>
      <a href="/private/invitations">invitations</a>
      <a href="/private/albums">albums</a>
      <a href="/private/logs">logs</a>
    </nav>
  `;
}