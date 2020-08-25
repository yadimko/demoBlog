const initialStore = {
  loadingEnd: false,
  error: false,
  articles: [],
};

export default function articlesReducer(state = initialStore, action) {
  switch (action.type) {
    case 'FETCH_ARTICLES_SUCCESS':
      return {
        ...state,
        articles: [...action.payload],
      };
    case 'FETCH_ARTICLES_REQUEST':
      return {
        ...state,
        loadingEnd: true,
      };
    case 'FETCH_ARTICLES_FAILURE':
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
}
