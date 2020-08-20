import BlogService from '../../blog-service/blog-service';

const bs = new BlogService();

export const FETCH_ARTICLE_ON_CLICK_REQUEST = () => ({ type: 'FETCH_ARTICLE_ON_CLICK_REQUEST' });

export const FETCH_ARTICLE_ON_CLICK_FAILURE = () => ({ type: 'FETCH_ARTICLE_ON_CLICK_FAILURE', error: 'Oops...'});

export const FETCH_ARTICLE_ON_CLICK_SUCCESS = (obj) => ({ type: 'FETCH_ARTICLE_ON_CLICK_SUCCESS', payload: obj });

export const GET_ARTICLE_ON_CLICK = (slug) => async(dispatch) => {
	try{
		const response = await bs.getArticleOnClick(slug);
		dispatch(FETCH_ARTICLE_ON_CLICK_SUCCESS(response.article));
	}catch(err){
		dispatch(FETCH_ARTICLE_ON_CLICK_FAILURE());
	}
	dispatch(FETCH_ARTICLE_ON_CLICK_REQUEST());
}