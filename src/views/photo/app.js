import Menu from '/components/header.js';

const html = htm.bind(React.createElement);
const { useEffect } = React;

function App() {
  const { pathname } = location;
  const image_name = pathname
    .split('/')
    .filter(Boolean)
    .slice(-1)
    .pop();

  console.log(image_name)

  const [filename, ext] = image_name.split('.');
  const thumbnail_name = `${filename}.thumbnail.${ext}`;

  useEffect(() => {
    requestAnimationFrame(scroll_bottom);
  }, []);

  return html`
    <div id="app">
      <${Menu} />

      <section id=download-links>
        <a href=${`/pictures/${thumbnail_name}`} download=${`/pictures/${thumbnail_name}`}>download thumbnail</a>
        <a href=${`/pictures/${image_name}`} download=${`/pictures/${image_name}`} >download original</a>
      </section>

      <div className="image-container">
        <img src=${`/pictures/${image_name}`} />
      </div>
    </div>
  `;
}

ReactDOM.render(
  html`
    <${App} />
  `,
  document.querySelector('#app')
);

function scroll_bottom() {
  if (
    document.body.clientHeight + document.body.scrollTop + 5 >
    document.body.scrollHeight
  ) {
    return document.body.scrollBy(0, 100);
  }

  document.body.scrollBy(0, 20);

  requestAnimationFrame(scroll_bottom);
}
