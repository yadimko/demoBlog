const initialStore = {
  loadingEnd: false,
  error: false,
  article: {},
};

export default function articleOnClickReducer(state = initialStore, action) {
  switch (action.type) {
    case 'FETCH_ARTICLE_ON_CLICK_START_DOWNLOAD':
      return {
      ...state,
      loadingEnd: false,
    };
    case 'FETCH_ARTICLE_ON_CLICK_SUCCESS':
      return {
        ...state,
        article: action.payload,
      };
    case 'FETCH_ARTICLE_ON_CLICK_REQUEST':
      return {
        ...state,
        loadingEnd: true,
      };
    case 'FETCH_ARTICLE_ON_CLICK_FAILURE':
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
}
