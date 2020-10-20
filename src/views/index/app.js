import Menu from '/components/header.js';

const html = htm.bind(React.createElement);

function App() {
  return html`
    <div id=page>
      <${Menu} />
    </div>
  `;
}

ReactDOM.render(
  html`<${App} />`,
  document.querySelector('#app')
);