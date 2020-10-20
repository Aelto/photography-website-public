import fetch_photos from './fetch-photos.js';

const html = htm.bind(React.createElement);
const { useState, useEffect, useReducer } = React;

export default function Photo(props) {
  const { dispatch } = props;
  const [is_editting, set_is_editting] = useState(false);
  const [show_actions, set_show_actions] = useState(false);
  const [location, set_location] = useState(props.location);
  const [title, set_title] = useState(props.title);
  const [description, set_description] = useState(props.description);
  const [date, set_date] = useState(new Date(props.date).toISOString().slice(0, 10));
  const [is_private, set_is_private] = useState(props.is_private);
  const [order_number, set_order_number] = useState(props.order_number);

  async function delete_photo() {
    try {
      const res = await fetch('censored-url-to-api', {
        method: 'delete',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify({ url: props.url })
      });
      const json = await res.json();

      alert(JSON.stringify(json, null, ' '));

      update_photo_list();
    } catch (err) {
      alert(err);
    }
  }

  async function update_photo_list() {
    dispatch({
      type: 'set_photos',
      payload: await fetch_photos()
    });
  }

  async function update_photo() {
    try {
      const res = await fetch('censored-url-to-api', {
        method: 'post',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify({
          url: props.url,
          description,
          date,
          title,
          location,
          is_private,
          order_number
        })
      });

      const json = await res.json();
      alert(JSON.stringify(json, null, ' '));
    } catch (err) {
      alert(err);
    }
  }

  async function generate_four_to_five_format() {
    console.log("-")
    try {
      const res = await fetch('censored-url-to-api', {
        method: 'post',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        // body: JSON.stringify({
        //   url: props.url,
        //   description,
        //   date,
        //   title,
        //   location,
        //   is_private,
        //   order_number
        // })
      });

      const json = await res.json();
      alert(JSON.stringify(json, null, ' '));
    } catch (err) {
      alert(err);
    }
  }

  return html`
    <li className="photo">
      <img src=${props.thumbnail_url} />

      <button onClick=${e => set_is_editting(!is_editting)}>edit</button>
      <button onClick=${e => set_show_actions(!show_actions)}>action</button>

      ${is_editting &&
        html`
          <form onSubmit=${e => e.preventDefault()}>
            <fieldset>
              <legend>edit photo</legend>

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

              <label htmlFor="is_private">is_private</label>
              <input
                id="is_private"
                type="checkbox"
                checked=${is_private}
                onChange=${e => set_is_private(e.target.checked)}
              />

              <label htmlFor="order_number">order number</label>
              <input
                id="order_number"
                type="number"
                value=${order_number}
                onChange=${e => set_order_number(e.target.value)}
              />

              <input value=${props.url} disabled />

              <p>
                <input value=${props.id} readOnly />
                <button onClick=${e => navigator.clipboard.writeText(props.id)}>
                  copy id
                </button>
              </p>

              <button onClick=${update_photo}>update</button>
              <button onClick=${delete_photo}>delete</button>
            </fieldset>
          </form>
        `}

        ${show_actions && html`
          <div>
            <button onClick=${generate_four_to_five_format}>generate 4:5 image from picture</button>
          </div>
        `}
    </li>
  `;
}