import fetch_users from './fetch-users.js';

export const initial_state = {
  users: []
};

export function reducer(state, action) {
  switch (action.type) {
    case 'set_users':
      return { users: action.payload };
      break;
  }
}

export async function update_users_list(dispatch) {
  dispatch({
    type: 'set_users',
    payload: await fetch_users()
  });
}