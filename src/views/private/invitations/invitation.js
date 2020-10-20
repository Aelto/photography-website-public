import delete_invitation from './delete-invitation.js';
import fetch_invitations from "./fetch-invitations.js";

const html = htm.bind(React.createElement);
const { useState, useEffect, useReducer } = React;

export default function Invitation({ dispatch, email, hash, expire_date }) {
  function copy_link() {
    const url = `${location.origin}/private/auth?email=${email}&hash=${hash}`;

    navigator.clipboard.writeText(url);
  }

  async function delete_click() {
    await delete_invitation(hash);

    dispatch({
      type: 'set_invitations',
      payload: await fetch_invitations()
    });
  }
  
  return html`
    <div className=invitation>
      <ul>
        <li>
          <b>email:</b> ${email}
        </li>

        <li>
          <b>hash:</b> ${hash}
        </li>

        <li>
          <b>expire on:</b> ${expire_date}
        </li>

        <li>
          <button onClick=${delete_click}>delete</button>
          <button onClick=${copy_link}>copy link</button>
        </li>
      </ul>

    </div>
  `;
}