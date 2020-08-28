import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import * as actions from '../../store/userSignControl/actions';
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
import EditArticle from '../edit-article-page/edit-article-page';

const App = ({ SIGN_IN_USER, signSuccess }) => {
  useEffect(() => {
    if (localStorage.length > 1){
      const user = {
        user: {
          email: localStorage.email,
          password: localStorage.password,
        },
      }
      SIGN_IN_USER(user)
    }
  }, [])

  const PrivateRoute = ({ component: Component, signSuccess, ...rest }) => (
    <Route
      {...rest}
      render={props => (
        signSuccess === true)
        ? <Redirect to="/profile" />
        : <Component {...props} />
        }
    />
  );

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
          <Route path="/load" exact render={() => <LoadingIndicator />} />
          <Switch>
            <Route path="/articles/:id" exact children={<ArticlePage />} />
          </Switch>
          <Switch>
            <Route path="/articles/:id/edit" children={<EditArticle />} />
          </Switch>
          <Route path="/sign-up" render={() => <SignUp />} />
          <Route path="/sign-in" render={() => <SignIn />} />
          <PrivateRoute signSuccess={signSuccess} path='/profile' >
            <EditProfile/>
          </PrivateRoute>
          {/*<Route path="/profile" render={() => <EditProfile />} />*/}
          <Route path="/new-article" render={() => <NewArticle />} />
        </section>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.userSignControlReducer.token,
    signSuccess: state.userSignControlReducer.signSuccess,
    email: state.userSignControlReducer.user.email,
    password: state.userSignControlReducer.user.password,
  }
}

export default connect(mapStateToProps, actions)(App);
