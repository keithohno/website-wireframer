import { LOAD_USER } from "../actions.js";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_USER:
      return { email: action.email, uuid: action.uuid };
  }
  return state;
};
