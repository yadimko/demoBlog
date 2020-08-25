const initialStore = {
  user: {},
  signSuccess: false,
  errorsFromAPI: {},
  error: '',
};

export default function userSignControlReducer(state = initialStore, action) {
  switch (action.type) {
    case 'RESPONSE_SUCCESS':
      return {
        ...state,
        user: { ...action.payload },
        signSuccess: true,
      };
    case 'RESPONSE_HAS_ERRORS':
      return {
        ...state,
        errorsFromAPI: { ...action.payload },
      };
    case 'RESPONSE_FAILURE':
      return {
        ...state,
        error: true,
      };
    case 'LOG_OUT':
      return {
        ...state,
        user: {},
        errorsFromAPI: {},
        signSuccess: false,
      };
    default:
      return state;
  }
}
