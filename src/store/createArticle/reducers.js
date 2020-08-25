const initialStore = {
  loadingEnd: false,
  errorsFromAPI: {},
  error: false,
  article: {},
  articleAdd: false,
};

export default function createArticleReducer(state = initialStore, action) {
  switch (action.type) {
    case 'RESPONSE_SUCCESS_ARTICLE':
      return {
        ...state,
        article: action.payload,
        articleAdd: true,
      };
    case 'RESPONSE_HAS_ERRORS_ARTICLE':
      return {
        ...state,
        errorsFromAPI: { ...action.payload },
      };
    case 'RESPONSE_REQUEST_ARTICLE':
      return {
        ...state,
        loadingEnd: true,
        articleAdd: false,
      };
    case 'RESPONSE_FAILURE_ARTICLE':
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
}
