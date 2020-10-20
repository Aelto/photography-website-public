import fetch_album from './fetch-album.js';
import fetch_album_pictures from './fetch-album-pictures.js';

const number_of_columns = Math.floor(window.innerWidth / 500) || 1;

export const initial_state = {
  album: null,

  pictures_to_load: [],
  columns: new Array(number_of_columns).fill(null).map(() => [])
};

export function reducer(state, action) {
  switch (action.type) {
    case 'set_album':
      return {
        ...state,
        album: action.payload
      };
      break;

    case 'add_pictures_to_load':
      return {
        ...state,
        pictures_to_load: state.pictures_to_load.concat(action.payload)
      };
      break;

    case 'first_element_loaded_in_column':
      const picture_to_load = state.pictures_to_load[0];
      if (!picture_to_load) {
        return state;
      }

      return {
        ...state,
        pictures_to_load: state.pictures_to_load.slice(1),
        columns: state.columns.map((column, i) =>
          i === action.payload
            ? [...column, picture_to_load]
            : Array.from(column)
        )
      };
      break;
  }
}

export function update_pictures_to_load(dispatch, album_id_number) {
  fetch_album_pictures(album_id_number).then(pictures =>
    dispatch({
      type: 'add_pictures_to_load',
      payload: pictures
    })
  );
}

export async function update_album(dispatch, album_id_number) {
  const album = await fetch_album(album_id_number);

  console.log(album);
  if (album.requires_password) {
    const album_access_password = prompt('The album is protected by a password, please enter the password :');

    document.cookie = `album_access_password=${album_access_password}; path=/`;
  }
  
  return dispatch({
    type: 'set_album',
    payload: album
  });
}
