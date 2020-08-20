const initialStore = {
	currentPage: 1,
	totalPage: 100
};

export default function paginationReducer(state = initialStore, action){
	switch (action.type){
		default:
			return state;
	}
}