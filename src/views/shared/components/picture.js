const html = htm.bind(React.createElement);

export default function Picture({ preview_url, thumbnail_url, description, title, onload = () => {} }) {
  const image_description = description || 'this image has no description';
  const image_title = title || 'access to this image';

  return html`
    <a className="picture" href=${preview_url} aria-label=${image_title} target="_blank">
      <img src=${thumbnail_url} onLoad=${onload} alt=${image_description} />
    </a>
  `;
}