import BlogService from '../../blog-service/blog-service';

const bs = new BlogService();

export const FETCH_ARTICLE_ON_CLICK_REQUEST = () => ({ type: 'FETCH_ARTICLE_ON_CLICK_REQUEST' });

export const FETCH_ARTICLE_ON_CLICK_START_DOWNLOAD = () => ({ type: 'FETCH_ARTICLE_ON_CLICK_START_DOWNLOAD' });

export const FETCH_ARTICLE_ON_CLICK_FAILURE = () => ({ type: 'FETCH_ARTICLE_ON_CLICK_FAILURE', error: 'Oops...' });

export const FETCH_ARTICLE_ON_CLICK_SUCCESS = (obj) => ({ type: 'FETCH_ARTICLE_ON_CLICK_SUCCESS', payload: obj });

export const DELETE_COMPLETE = () => ({ type: 'DELETE_COMPLETE' });

export const EDIT_COMPLETE = () => ({ type: 'EDIT_COMPLETE' });

export const GET_ARTICLE_ON_CLICK = (slug) => async (dispatch) => {
  dispatch(FETCH_ARTICLE_ON_CLICK_START_DOWNLOAD());
  try {
    const response = await bs.getArticleOnClick(slug);
    dispatch(FETCH_ARTICLE_ON_CLICK_SUCCESS(response.article));
  } catch (err) {
    dispatch(FETCH_ARTICLE_ON_CLICK_FAILURE());
  }
  dispatch(FETCH_ARTICLE_ON_CLICK_REQUEST());
};

export const EDIT_ARTICLE = (body, slug, token) => async (dispatch) => {
  const data = JSON.stringify(body);
  try {
    const response = await bs.editArticle(data, slug, token);
    if ('article' in response) {
      dispatch(FETCH_ARTICLE_ON_CLICK_SUCCESS(response.article));
      dispatch(EDIT_COMPLETE());
    }
  } catch (err) {
    dispatch(FETCH_ARTICLE_ON_CLICK_FAILURE());
  }
};

export const DELETE_ARTICLE = (slug, token) => async (dispatch) => {
  try {
    await bs.deleteArticle(slug, token);
    dispatch(DELETE_COMPLETE());
  } catch (err) {
    dispatch(FETCH_ARTICLE_ON_CLICK_FAILURE());
  }
};
