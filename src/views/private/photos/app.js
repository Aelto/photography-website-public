import Menu from '/components/header.js';
import Nav from '/components/nav.js';
import fetch_photos from './fetch-photos.js';
import Photo from './photo.js';

const html = htm.bind(React.createElement);
const { useState, useEffect, useReducer } = React;

const initial_state = {
  photos: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'set_photos':
      return { photos: action.payload };
      break;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initial_state);
  const [location, set_location] = useState('Nice');
  const [title, set_title] = useState('');
  const [description, set_description] = useState('');
  const [date, set_date] = useState(new Date().toISOString().slice(0, 10));
  const [is_private, set_is_private] = useState(false);
  const [display_trademark_form, set_display_trademark_form] = useState(false);
  const [gravity, set_gravity] = useState(2);

  async function update_photo_list() {
    dispatch({
      type: 'set_photos',
      payload: await fetch_photos()
    });
  }

  async function upload_photo(e) {
    e.preventDefault();

    const $file = document.querySelector('#photo');

    const form_data = new FormData();
    form_data.append('picture', $file.files[0]);
    form_data.append('location', location);
    form_data.append('title', title.trim());
    form_data.append('description', description.trim());
    form_data.append('date', date);
    form_data.append('is_private', is_private);
    
    if (display_trademark_form) {
      form_data.append('trademark_gravity', gravity);
    }

    const res = await fetch('censored-url-to-api', {
      method: 'PUT',
      body: form_data
    });
    const json = await res.json();

    alert(JSON.stringify(json, null, ' '));
    update_photo_list();
  }

  useEffect(() => {
    update_photo_list();
  }, []);

  return html`
    <div id="page">
      <${Menu} />
      <${Nav} />

      <h2>Photos page</h2>

      <form onSubmit=${upload_photo}>
        <fieldset>
          <legend>upload photo</legend>

          <label htmlFor="location">location</label>
          <input
            id="location"
            value=${location}
            onChange=${e => set_location(e.target.value)}
          />

          <label htmlFor="title">title</label>
          <input
            id="title"
            value=${title}
            onChange=${e => set_title(e.target.value)}
          />

          <label htmlFor="description">description</label>
          <input
            id="description"
            value=${description}
            onChange=${e => set_description(e.target.value)}
          />

          <label htmlFor="date">date</label>
          <input
            id="date"
            type="date"
            value=${date}
            onChange=${e => set_date(e.target.value)}
          />

          <label htmlFor="is_private">
            <input
              id="is_private"
              type="checkbox"
              checked=${is_private}
              onChange=${e => set_is_private(e.target.checked)}
            />
            is_private
          </label>

          <label htmlFor="add_trademark">
            <input
              id=add_trademark
              type=checkbox
              checked=${display_trademark_form}
              onChange=${e => set_display_trademark_form(e.target.checked)}
            />
            add trademark
          </label>
          

          ${display_trademark_form && html`
            <ul>
              <li>
                <label htmlFor="horizontal_position">
                  trademark gravity
                </label>
                <select id=horizontal_position
                  onChange=${e => set_gravity(e.target.value)}>
                  <option value=0 selected=${gravity === 0}>center</option>
                  <option value=1 selected=${gravity === 1}>north</option>
                  <option value=2 selected=${gravity === 2}>east</option>
                  <option value=2 selected=${gravity === 3}>south</option>
                  <option value=2 selected=${gravity === 4}>west</option>
                  <option value=2 selected=${gravity === 5}>northeast</option>
                  <option value=2 selected=${gravity === 6}>southeast</option>
                  <option value=2 selected=${gravity === 7}>southwest</option>
                  <option value=2 selected=${gravity === 8}>northwest</option>
                </select>
              </li>
            </ul>
          `}


          <label htmlFor="photo">photo</label>
          <input type="file" id="photo" />

          <button>upload photo</button>
        </fieldset>
      </form>

      <hr />

      <ul>
        ${state.photos.map(
          photo =>
            html`
              <${Photo} ...${photo} dispatch=${dispatch} key=${photo.id} />
            `
        )}
      </ul>
    </div>
  `;
}

ReactDOM.render(
  html`
    <${App} />
  `,
  document.querySelector('#app')
);

