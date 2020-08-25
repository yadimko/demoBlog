import BlogService from '../../blog-service/blog-service';

const bs = new BlogService();

export const RESPONSE_REQUEST_ARTICLE = () => ({ type: 'RESPONSE_REQUEST_ARTICLE' });

export const RESPONSE_HAS_ERRORS_ARTICLE = (obj) => ({ type: 'RESPONSE_HAS_ERRORS_ARTICLE', payload: obj });

export const RESPONSE_FAILURE_ARTICLE = () => ({ type: 'RESPONSE_FAILURE_ARTICLE', error: 'Oops...' });

export const RESPONSE_SUCCESS_ARTICLE = (obj) => ({ type: 'RESPONSE_SUCCESS_ARTICLE', payload: obj });

export const CREATE_ARTICLE = (body, token) => async (dispatch) => {
  dispatch(RESPONSE_REQUEST_ARTICLE());
  const data = JSON.stringify(body);
  try {
    const response = await bs.createArticle(data, token);
    if ('errors' in response) {
      dispatch(RESPONSE_HAS_ERRORS_ARTICLE(response.errors));
    }
    if ('article' in response) {
      dispatch(RESPONSE_SUCCESS_ARTICLE(response.article));
    }
  } catch (err) {
    dispatch(RESPONSE_FAILURE_ARTICLE());
  }
};
