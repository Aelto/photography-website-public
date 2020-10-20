import fetch_albums from './fetch-albums.js';
import delete_album from './delete-album.js';

const html = htm.bind(React.createElement);
const { useState, useEffect, useReducer } = React;

export default function Album(props) {
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [is_private, setIs_private] = useState(props.is_private);
  const [order_number, setOrder_number] = useState(props.order_number);
  const [access_password, setAccess_password] = useState(props.access_password);
  const [new_picture_id, setNew_picture_id] = useState(0);
  const { dispatch } = props;

  async function self_update_album() {
    const response = await fetch('censored-url-to-api', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        description,
        is_private,
        order_number,
        access_password
      })
    });

    const albums = await fetch_albums();

    dispatch({
      type: 'set_albums',
      payload: albums
    });
  }

  async function self_delete_album() {
    if (!confirm('delete album?')) {
      return;
    }

    await delete_album(props.id);
    const albums = await fetch_albums();

    dispatch({
      type: 'set_albums',
      payload: albums
    });
  }

  async function load_album_pictures() {
    const response = await fetch('censored-url-to-api');
    const { pictures } = await response.json();

    dispatch({
      type: 'set_album_pictures',
      payload: {
        id: props.id,
        pictures
      }
    });
  }

  async function add_album_picture() {
    const response = await fetch('censored-url-to-api', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        picture_id: new_picture_id
      })
    });

    const text = await response.text();

    // no await to make it async during the alert
    load_album_pictures();

    alert(text);
  }

  async function remove_album_picture(picture_id) {
    if (!confirm('remove picture from album?')) {
      return;
    }

    const response = await fetch('censored-url-to-api', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ picture_id })
    });

    const text = await response.text();

    // no await to make it async during the alert
    load_album_pictures();

    alert(text);
  }

  return html`
    <div className='album'>
      <div className='id'>${props.id}</div>

      <input className='name' value=${name} onChange=${e => setName(e.target.value)} />
      <textarea className='description' value=${description} onChange=${e => setDescription(e.target.value)}>
      </textarea>
      
      <div className='private'>
        <input type="checkbox" defaultChecked=${is_private} onChange=${e => setIs_private(e.target.checked)} />
        private
      </div>
      <input className='order' type=number value=${order_number} onChange=${e => setOrder_number(e.target.value)} />

      <label>access password</label>
      <input className='access-password' type=text value=${access_password} onChange=${e => setAccess_password(e.target.value)} />
      
      <div className='buttons'>
        <button onClick=${self_update_album}>update</button>
        <button onClick=${self_delete_album}>delete</button>
        <button onClick=${load_album_pictures}>load album photos</button>
      </div>

      <div className='add-image-row'>
        <input type="number" value=${new_picture_id} onChange=${e => setNew_picture_id(e.target.value)} />

        <button onClick=${async () => setNew_picture_id(await navigator.clipboard.readText())}>clipboard</button>
        <button onClick=${add_album_picture}>add image</button>
      </div>

      ${
        props.pictures && html`
          <div className='album-pictures'>
            ${props.pictures.map(picture => html`
              <img key=${picture.id} src=${picture.thumbnail_url} onClick=${() => remove_album_picture(picture.id)} />
            `)}
          </div>
        `
      }
    </div>
  `;
}