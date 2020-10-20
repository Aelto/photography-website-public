const html = htm.bind(React.createElement);
const { useState, useEffect, useReducer } = React;

export default function Album(props) {
  const album_url = `/album/${props.id}`;

  useEffect(() => {
    if (props.cover === null) {
      props.onload();
    }
  }, []);

  return html`
    <a href=${album_url} className="album">
      ${props.cover !== null &&
        html`
          <img
            className="cover"
            src=${props.cover.thumbnail_url}
            onLoad=${props.onload}
          />
        `}
      <div className="name">${props.name}</div>
      <div className="description">${props.description}</div>
      ${!!Number(props.is_private) &&
        html`
          <span className="private">private</span>
        `}
    </a>
  `;
}