import { POLYGON_ACTIONS } from '../constants';

export default (state = [], action = {}) => {
  switch (action.type) {
    case POLYGON_ACTIONS.SET_POLYGONS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
