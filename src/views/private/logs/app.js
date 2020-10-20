import Nav from '/components/nav.js';
import Header from '/components/header.js';

const html = htm.bind(React.createElement);
const { useState, useEffect, useReducer } = React;

const initial_state = {
  logs: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'set_logs':
      return { logs: action.payload };
      break;
  }
}


function App() {
  const [state, dispatch] = useReducer(reducer, initial_state);

  useEffect(() => {
    fetch('censored-url-to-api')
    .then(r => r.json())
    .then(({ logs }) => logs.split('\n'))
    .then(logs => dispatch({
      type: 'set_logs',
      payload: logs
    }));
  }, []);

  const logs = state.logs.map((log, i) => html`
    <div key=${i}>${log}</div>
  `);

  return html`
    <div id=app>
      <${Header} />
      <${Nav} />

      <section className="album-list">
        ${logs}
      </section>
    </div>
  `;
}

ReactDOM.render(
  html`<${App} />`,
  document.querySelector('#app')
);