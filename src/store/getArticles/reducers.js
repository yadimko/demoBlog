const initialStore = {
  loadingEnd: false,
  error: false,
  articles: [],
  likeCount: 0
};

export default function articlesReducer(state = initialStore, action) {
  switch (action.type) {
    case 'FETCH_ARTICLES_SUCCESS':
      return {
        ...state,
        articles: [...action.payload],
        error: false
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
    case 'FETCH_LIKE':
      return {
        ...state,
        likeCount: state.likeCount + 1
      }
    default:
      return state;
  }
}
