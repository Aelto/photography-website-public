const html = htm.bind(React.createElement);

export default function Menu() {
  const should_display_signin = localStorage.getItem('auth-email');
  
  return html`
    <header>
      <h1>Thibault Hottou - Photography</h1>
      <nav>
        <a href="/photos">photos</a>
        <a href="/albums">albums</a>
        <a href="https://www.instagram.com/t.hottou/">my instagram</a>
        <a href="/about">about me</a>

        ${should_display_signin && html`
          <a key="1" href="/private/auth">sign-in</a>
          <a key="2" href="/private/home">private</a>
        `}
      </nav>
    </header>
  `;
}