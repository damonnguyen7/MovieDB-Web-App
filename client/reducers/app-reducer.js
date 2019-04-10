import { TOGGLE_SPINNER } from '../action-types';

const initialState = {
  displaySpinner: false,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case TOGGLE_SPINNER:
      return {
        ...state,
        displaySpinner: !state.displaySpinner
      }
      break;
    default:
      return state;
  }
}