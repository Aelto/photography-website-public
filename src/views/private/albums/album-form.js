import fetch_albums from './fetch-albums.js';

const html = htm.bind(React.createElement);
const { useState } = React;

export default function AlbumForm({ dispatch }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [is_private, setIs_private] = useState(false);
  const [order_number, setOrder_number] = useState(0);
  const [access_password, setAccess_password] = useState('');

  async function submitAlbum(e) {
    e.preventDefault();

    const response = await fetch('censored-url-to-api', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        description,
        is_private,
        order_number,
        access_password
      })
    });
    const text = await response.text();
    const albums = await fetch_albums();

    dispatch({ type: 'set_albums', payload: albums });
    alert(text);
  }

  return html`
    <div>
      <form onSubmit=${submitAlbum}>
        <fieldset>
          <legend>Create an album</legend>

          <label>Name</label>
          <input value=${name} type=text onChange=${e => setName(e.target.value)} />

          <label>Description</label>
          <input value=${description} type=text onChange=${e => setDescription(e.target.value)} />

          <label>
            set private
            <input
              type=checkbox
              ${is_private ? "checked" : ""}
              onChange=${e => setIs_private(e.target.checked)}
            />
          </label>

          <label>Ask password for access (works on public/private albums). <b>The password is stored in plaintext!</b>. <i>note: if the album is private but there is a password, it's like a public album hidden from the public page only.</i></label>
          <input className='access-password' type=text value=${access_password} onChange=${e => setAccess_password(e.target.value)} />


          <label>
            Order number
          </label>
          <input type=number value=${order_number} onChange=${e => setOrder_number(e.target.value)} />

          <input type=submit />
        </fieldset>
      </form>
    </div>
  `;
}