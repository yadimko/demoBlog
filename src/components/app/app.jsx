import React from 'react';
import classes from './app.module.scss'

import Header from '../header';
import ArticlesPreview from '../articles-preview';
import PaginationPanel from '../pagination-panel';
import LoadingIndicator from '../loading-indicator';
import ArticlePage from '../article-page';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


const App = () => {
	return (
		<div className={classes['blog-wrapper']}>
			<Router>
				<Header />
				<section className={classes['articles-wrapper']}>
					<Route path='/' exact>
						<ArticlesPreview />
						<PaginationPanel />
					</Route>
					<Route path='/articles' exact>
						<ArticlesPreview />
						<PaginationPanel />
					</Route>
					<Route path='/hui' exact render={() => <LoadingIndicator />} />
					{/*<Route path='/articles/:id' exact*/}
					{/*			 render={({match, location, history}) => {*/}
					{/*			 	const {id} = match.params;*/}
					{/*			 	return <ArticlePage slugId={id}/>*/}
					{/*			 }} />*/}
					<Switch>
						<Route path='/articles/:id' children={<ArticlePage/>}/>
					</Switch>

				</section>
			</Router>
		</div>
	);
};

export default App;