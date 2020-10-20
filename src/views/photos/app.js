import Menu from '/components/header.js';
import Picture from '/components/picture.js';
import DynamicColumns from '/components/dynamic-columns.js';

const html = htm.bind(React.createElement);
const { useState, useEffect, useReducer } = React;

const number_of_columns = Math.floor(window.innerWidth / 500) || 1;

const initial_state = {
  pictures_to_load: [],
  columns: new Array(number_of_columns).fill(null).map(() => [])
};

function reducer(state, action) {
  switch (action.type) {
    case 'add_pictures_to_load':
      return { 
        ...state,
        pictures_to_load: state.pictures_to_load.concat(action.payload)
      };
      break;

    case 'first_element_loaded_in_column':
      const picture_to_load = state.pictures_to_load[0]
      if (!picture_to_load) {
        return state;
      }

      return {
        ...state,
        pictures_to_load: state.pictures_to_load.slice(1),
        columns: state.columns.map((column, i) => 
          i === action.payload
            ? [...column, picture_to_load]
            : Array.from(column)
        )
      };
      break;
  }
}

function get_search() {
  if (!location.search) {
    return {};
  }

  return location.search
  .slice(1)
  .split('&')
  .map(s => s.split('='))
  .reduce((acc, [param, value]) => {
    acc[param] = value;

    return acc;
  }, {});
}

let scroll_function = function() {};
let is_scrolling = false;
let last_page = false;
let is_fetching = false;
window.addEventListener('scroll', e => {
  is_scrolling = true;

  handle_scrolling();
});

async function handle_scrolling() {
  if (!is_scrolling) {
    return;
  }

  is_scrolling = false;

  const scroll_top = document.scrollingElement.scrollTop;
  const scroll_height = document.scrollingElement.scrollHeight;
  const client_height = document.scrollingElement.clientHeight;

  if (scroll_top + client_height * 1.1 >= scroll_height && !last_page && !is_fetching) {
    is_fetching = true;
    await scroll_function();

    setTimeout(() => {
      is_fetching = false;
    }, 200);
  }

  requestAnimationFrame(handle_scrolling);
}

function App() {
  const [state, dispatch] = useReducer(reducer, initial_state);
  const { pictures_to_load, columns } = state;
  const [ page, set_page ] = useState(1);

  async function fetch_pictures(page) {
    const res = await fetch('censored-url-to-api');
    const json = await res.json();
    const { photos } = json;

    if (photos.length > 0) {
      dispatch({
        type: 'add_pictures_to_load',
        payload: photos
      });
    }
    else {
      last_page = true;
      set_page(page - 1);

      if (!state.pictures_to_load.length && !columns.map(col => col.length).reduce((n, c) => n + c, 0)) {
        fetch_pictures(page - 1);
      }
    }
  }

  useEffect(() => {
    scroll_function = async function() {
      const search = get_search();

      if (page) {
        set_page(page + 1);
        await fetch_pictures(Number(page) + 1);
      }
    };
  });

  useEffect(() => {
    if (!page || page < 1) {
      set_page(1);
    }

    fetch_pictures(page);
  }, []);
  
  
  return html`
    <div id=page>
      <${Menu} />

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