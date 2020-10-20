import Menu from '/components/header.js';
import Nav from '/components/nav.js'
import fetch_invitations from './fetch-invitations.js';
import Invitation from './invitation.js';
import create_invitation from './create-invitation.js';

const html = htm.bind(React.createElement);
const { useState, useEffect, useReducer } = React;

const initial_state = {
  invitations: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'set_invitations':
      return { invitations: action.payload };
      break;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initial_state);
  const [email, set_email] = useState('');

  async function update_invitations_list() {
    dispatch({
      type: 'set_invitations',
      payload: await fetch_invitations()
    });
  }

  async function form_submit(e) {
    e.preventDefault();

    await create_invitation(email);
    update_invitations_list();
    set_email('');
  }

  useEffect(() => {
    update_invitations_list();
  }, []);

  return html`
    <div id="page">
      <${Menu} />
      <${Nav} />

      <h2>Invitations page</h2>

      <form onSubmit=${form_submit}>
        <fieldset>
          <legend>Create an invitation</legend>

          <label htmlFor="email">Email</label>
          <input
            id="email"
            value=${email}
            type=text
            onChange=${e => set_email(e.target.value)}
          />

          <br />

          <input type=submit value="new invitation" />
        </fieldset>
      </form>

      <hr />

      <section>
        <ul>
          ${state.invitations.map(
            invitation =>
              html`<li key=${invitation.hash}><${Invitation} dispatch=${dispatch} ...${invitation} /></li>`
          )}
        </ul>
      </section>
    </div>
  `;
}

ReactDOM.render(
  html`
    <${App} />
  `,
  document.querySelector('#app')
);
