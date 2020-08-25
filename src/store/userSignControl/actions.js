import BlogService from '../../blog-service/blog-service';

const bs = new BlogService();

export const RESPONSE_FAILURE = () => ({ type: 'RESPONSE_FAILURE', error: 'Oops...' });

export const RESPONSE_SUCCESS = (obj) => ({ type: 'RESPONSE_SUCCESS', payload: obj });

export const RESPONSE_HAS_ERRORS = (obj) => ({ type: 'RESPONSE_HAS_ERRORS', payload: obj });

export const LOG_OUT = () => ({ type: 'LOG_OUT' });

export const SIGN_UP_USER = (body) => async (dispatch) => {
  const data = JSON.stringify(body);
  try {
    const response = await bs.signUpUser(data);
    if ('errors' in response) {
      dispatch(RESPONSE_HAS_ERRORS(response.errors));
    }
    if ('user' in response) {
      dispatch(RESPONSE_SUCCESS(response.user));
    }
  } catch (err) {
    dispatch(RESPONSE_FAILURE());
  }
};

export const SIGN_IN_USER = (body) => async (dispatch) => {
  const data = JSON.stringify(body);
  try {
    const response = await bs.signInUser(data);
    if ('errors' in response) {
      dispatch(RESPONSE_HAS_ERRORS(response.errors));
    }
    if ('user' in response) {
      dispatch(RESPONSE_SUCCESS(response.user));
    }
  } catch (err) {
    dispatch(RESPONSE_FAILURE());
  }
};

export const UPDATE_USER = (body, token) => async (dispatch) => {
  const data = JSON.stringify(body);
  try {
    const response = await bs.updateUser(data, token);
    if ('errors' in response) {
      dispatch(RESPONSE_HAS_ERRORS(response.errors));
    }
    if ('user' in response) {
      dispatch(RESPONSE_SUCCESS(response.user));
    }
  } catch (err) {
    dispatch(RESPONSE_FAILURE());
  }
};
