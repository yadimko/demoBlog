import BlogService from '../../blog-service/blog-service';

const bs = new BlogService();

export const FETCH_ARTICLES_REQUEST = () => ({ type: 'FETCH_ARTICLES_REQUEST' });

export const FETCH_ARTICLES_FAILURE = () => ({ type: 'FETCH_ARTICLES_FAILURE', error: 'Oops...' });

export const FETCH_ARTICLES_SUCCESS = (array) => ({ type: 'FETCH_ARTICLES_SUCCESS', payload: array });

export const GET_ARTICLES_FETCH = (page = 1) => async (dispatch) => {
  try {
    const response = await bs.getArticlesFromAPI(page);
    dispatch(FETCH_ARTICLES_SUCCESS(response.articles));
  } catch (err) {
    dispatch(FETCH_ARTICLES_FAILURE());
  }
  dispatch(FETCH_ARTICLES_REQUEST());
};
