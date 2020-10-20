import Nav from '/components/nav.js';
import Header from '/components/header.js';
import fetch_albums from './fetch-albums.js';
import Album from './album.js';
import AlbumForm from './album-form.js';
import { reducer, initial_state } from './reducer.js';

const html = htm.bind(React.createElement);
const { useEffect, useReducer } = React;

function App() {
  const [state, dispatch] = useReducer(reducer, initial_state);

  useEffect(() => {
    fetch_albums()
    .then(albums => dispatch({
      type: 'set_albums',
      payload: albums
    }));
  }, []);

  const albums = state.albums
    .map(a => html`<${Album} key=${a.id} ...${a} dispatch=${dispatch} />`);

  return html`
    <div id=app>
      <${Header} />
      <${Nav} />
      <${AlbumForm} dispatch=${dispatch} />

      <section className="album-list">
        ${albums}
      </section>
    </div>
  `;
}

ReactDOM.render(
  html`<${App} />`,
  document.querySelector('#app')
);

