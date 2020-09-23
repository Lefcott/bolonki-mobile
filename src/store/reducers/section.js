import { SECTIONS, SECTION_ACTIONS } from '../constants';

export default (state = SECTIONS.MENU, action = {}) => {
  switch (action.type) {
    case SECTION_ACTIONS.SET_SECTION: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
