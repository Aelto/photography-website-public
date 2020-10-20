import fetch_albums from './fetch-albums.js';
import fetch_album_cover from './fetch-album-cover.js';

const number_of_columns = Math.floor(window.innerWidth / 500) || 1;

export const initial_state = {
  albums_to_load: [],
  columns: new Array(number_of_columns).fill(null).map(() => [])
};

export function reducer(state, action) {
  switch (action.type) {
    case 'set_albums':
      return {
        ...state,
        albums_to_load: action.payload
      };
      break;

    case 'first_element_loaded_in_column':
      const picture_to_load = state.albums_to_load[0];
      if (!picture_to_load) {
        return state;
      }

      return {
        ...state,
        albums_to_load: state.albums_to_load.slice(1),
        columns: state.columns.map((column, i) =>
          i === action.payload
            ? [...column, picture_to_load]
            : Array.from(column)
        )
      };
      break;
  }
}

export function update_album_list(dispatch) {
  fetch_albums()
    .then(albums =>
      Promise.all(
        albums.map(async album => {
          const cover = await fetch_album_cover(album.id);
          album.cover = cover;

          return album;
        })
      )
    )
    .then(albums =>
      dispatch({
        type: 'set_albums',
        payload: albums
      })
    );
}
