import { update_users_list } from './reducer.js';

const html = htm.bind(React.createElement);
const { useState, useEffect, useReducer } = React;

export default function User({ dispatch, email, password, role, token, token_expire_date }) {

  async function delete_user() {
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
        body: JSON.stringify({ email })
      });

      alert(await res.text());
      update_users_list(dispatch);
    }
    catch (err) {
      console.log(err);
      alert(err);
    }
  }

  return html`
    <ul className=user>
      <li><b>email:</b> ${email}</li>
      <li><b>password:</b> ${password}</li>
      <li><b>role:</b> ${role}</li>
      <li><b>token:</b> ${token}</li>
      <li><b>token_expire_date:</b> ${token_expire_date}</li>
      <li>
        <button onClick=${delete_user}>delete</button>
      </li>
    </ul>
  `;
}