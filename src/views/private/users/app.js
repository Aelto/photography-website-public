import Menu from '/components/header.js';
import Nav from '/components/nav.js';
import { reducer, initial_state, update_users_list } from './reducer.js';
import User from './user.js';

const html = htm.bind(React.createElement);
const { useState, useEffect, useReducer } = React;

function App() {
  const [state, dispatch] = useReducer(reducer, initial_state);

  useEffect(() => {
    update_users_list(dispatch);
  }, []);

  return html`
    <div id="page">
      <${Menu} />
      <${Nav} />

      <h2>Users page</h2>
      <section>
        <ul>
          ${state.users.map(
            user =>
              html`<li key=${user.token}><${User} dispatch=${dispatch} ...${user} /></li>`
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
