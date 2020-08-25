const initialStore = {
  loadingEnd: false,
  error: false,
  article: {},
  deleteStatus: false,
  editStatus: false,
};

export default function articleOnClickReducer(state = initialStore, action) {
  switch (action.type) {
    case 'FETCH_ARTICLE_ON_CLICK_START_DOWNLOAD':
      return {
        ...state,
        loadingEnd: false,
        editStatus: false,
        deleteStatus: false,
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
    case 'EDIT_COMPLETE':
      return {
        ...state,
        editStatus: true,
      };
    case 'DELETE_COMPLETE':
      return {
        ...state,
        deleteStatus: true,
      };
    default:
      return state;
  }
}
