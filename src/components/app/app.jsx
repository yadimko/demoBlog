import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import classes from './app.module.scss';

import Header from '../header';
import ArticlesPreview from '../articles-preview';
import PaginationPanel from '../pagination-panel';
import LoadingIndicator from '../loading-indicator';
import ArticlePage from '../article-page';
import SignUp from '../sign-up-page';
import SignIn from '../sign-in-page';
import EditProfile from '../edit-profile-page';
import NewArticle from '../new-article-page';



const App = () => {

  return (
    <div className={classes['blog-wrapper']}>
      <Router>
        <Header />
        <section className={classes['content-wrapper']}>
          <Route path="/" exact>
            <ArticlesPreview />
            <PaginationPanel />
          </Route>
          <Route path="/articles" exact>
            <ArticlesPreview />
            <PaginationPanel />
          </Route>
          <Route path="/hui" exact render={() => <LoadingIndicator />} />
          {/*<Route path='/articles/:id' exact*/}
          {/*			 render={({match, location, history}) => {*/}
          {/*			 	const {id} = match.params;*/}
          {/*			 	return <ArticlePage slugId={id}/>*/}
          {/*			 }} />*/}
          <Switch>
            <Route path="/articles/:id" children={<ArticlePage />} />
          </Switch>
          <Route path="/sign-up" render={() => <SignUp />} />
          <Route path="/sign-in" render={() => <SignIn />} />
          <Route path="/profile" render={() => <EditProfile />} />
          <Route path="/new" render={() => <NewArticle />} />
        </section>
      </Router>
    </div>
  );
};

export default App;
