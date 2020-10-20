import Menu from '/components/header.js';
import DynamicColumns from '/components/dynamic-columns.js';
import Album from './album.js';
import { reducer, initial_state, update_album_list } from './reducer.js';

const html = htm.bind(React.createElement);
const { useEffect, useReducer } = React;

function App() {
  const [state, dispatch] = useReducer(reducer, initial_state);
  const { albums_to_load, columns } = state;

  useEffect(() => {
    update_album_list(dispatch);
  }, []);

  return html`
    <div id="app">
      <${Menu} />
      <${DynamicColumns}
        className="photos"
        columns=${columns}
        component=${Album}
        key_name="id"
        dispatch=${dispatch}
        elements_to_load=${albums_to_load}
      />
    </div>
  `;
}

ReactDOM.render(
  html`
    <${App} />
  `,
  document.querySelector('#app')
);
