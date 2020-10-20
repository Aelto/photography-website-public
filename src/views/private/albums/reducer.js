export const initial_state = {
  albums: []
};

export function reducer(state, action) {
  switch (action.type) {
    case 'add_album':
      return { albums: [action.payload, ...state.albums] };
      break;

    case 'set_albums':
      return { albums: action.payload };
      break;

    case 'set_album_pictures':
      const albums = state.albums
        .map(album => {
          if (album.id === action.payload.id) {
            album.pictures = action.payload.pictures;
          }

          return album;
        });

      return { albums };
      break;
  }
}