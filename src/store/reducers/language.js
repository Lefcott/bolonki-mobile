import { LANGUAGES, LANGUAGE_ACTIONS } from '../constants';

export default (state = LANGUAGES.EN, action = {}) => {
  switch (action.type) {
    case LANGUAGE_ACTIONS.SET_LANGUAGE: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
