import Menu from '/components/header.js';

const html = htm.bind(React.createElement);

function App() {
  return html`
    <div id=page>
      <${Menu} />

      <section>
        I'm a french software developper interested in photography who just decided to combine these two domains and make
        <a href="/">t.hottou.fr</a> to share my work and progression.
        Every time you come on this website everything may have changed because, well that's what i get for making my own website,
        i'm never fully statisfied by its design! So i invite you to come here from time to time to appreciate my work and the time
        i put into making these shots and this website. 
        <div>👍</div>
      </section>

      <a href="/">go back to home</a>
    </div>
  `;
}

ReactDOM.render(
  html`<${App} />`,
  document.querySelector('#app')
);
