import Menu from '/components/header.js';
import DynamicColumns from '/components/dynamic-columns.js';
import Picture from '/components/picture.js';

import { reducer, initial_state, update_album, update_pictures_to_load } from './reducer.js';

const html = htm.bind(React.createElement);
const { useState, useEffect, useReducer } = React;

function App() {
  const [state, dispatch] = useReducer(reducer, initial_state);
  const { pictures_to_load, columns } = state;

  useEffect(() => {
    const [_, album_id] = location.pathname.match(/album\/(\w+)/);

    const album_id_number = Number(album_id);
    if (!Number.isInteger(album_id_number)) {
      return;
    }

    update_album(dispatch, album_id_number)
    .then(() => update_pictures_to_load(dispatch, album_id_number));
  }, []);

  return html`
    <div id=app>
      <${Menu} />

      ${state.album !== null && html`
        <div className='album-information'>
          <h3>${state.album.name}</h3>
          <p>${state.album.description}</p>
        </div>
      `}

      <${DynamicColumns} className="photos" 
        columns=${columns}
        component=${Picture}
        key_name='id'
        dispatch=${dispatch}
        elements_to_load=${pictures_to_load} />
    </div>
  `;
}

ReactDOM.render(
  html`<${App} />`,
  document.querySelector('#app')
);

