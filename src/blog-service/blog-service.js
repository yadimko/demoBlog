const _rootUrl = 'https://conduit.productionready.io/api/';

export default class BlogService {

	async getArticlesFromAPI(num = 0) {
		let numberOfPage;
		if (num === 1){
			numberOfPage = 0;
		}else{
			numberOfPage = num * 5;
		}
		const response = await fetch(`${_rootUrl}articles?limit=5&offset=${numberOfPage}`);
		const data = await response.json();
		return data;
	}

	async getArticleOnClick(slug) {
		const response = await fetch(`${_rootUrl}articles/${slug}`);
		const data = await response.json();
		return data;
	}
}



