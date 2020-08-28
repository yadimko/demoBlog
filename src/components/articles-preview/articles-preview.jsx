import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as dateFns from 'date-fns';
import { withRouter, Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './articles-preview.module.scss';
import * as actions from '../../store/getArticles/actions';
import heart from '../../img/heart.svg';
import love from '../../img/love_heart.svg';

let key = 1;

const ArticlesPreview = ({ articles, signSuccess, error, token, LIKE, GET_ARTICLES_FETCH }) => {
  useEffect(() => {
    GET_ARTICLES_FETCH(1, token);
  }, []);

  const [btnRedirect, setBtnRedirect] = useState(false)

  if (error){
    return <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 'auto'}}>
      <img src="http://www.ochevidets.ru/userfiles/2017/11/25/f8be128f44.jpg" alt=""/>
      <h1 style={{color: 'red', margin: 'auto', paddingBottom: '25px'}}>Server ERROR. Мы уже исправляем проблему</h1>
    </div>
  }

  if (btnRedirect){
    return <Redirect to='/sign-in'/>
  }

  const clickOnHeart = (slug, token) => {
    if (!signSuccess){
      setBtnRedirect(true)
    }
    LIKE(slug, token);
  }

  const articlesCollection = articles.map((art) => {
    const tags = art.tagList.map((tag) => {
      return (
        <span className={classes['article-preview__body-tags--tag']} key={key++}>
          {tag}
        </span>
      );
    });

    const date = dateFns.format(new Date(art.createdAt), 'dd MMMM yyyy');
    const path = `/articles/${art.slug}`;
    return (
      <div className={classes['article-preview__body']} key={key++}>
        <div className={classes['article-preview__body-left_block']}>
          <div className={classes['article-preview__body-title']}>
            <span className={classes['article-preview__body-title--name']}>
              <Link to={path}>{art.title}</Link>
            </span>
            <span className={classes['article-preview__body-title--heart']}>
              <button
                type="button"
                onClick={() => {clickOnHeart(art.slug, token)}}
              >
                <img src={art.favorited ? love : heart} alt="" />
              </button>
              <span>{art.favoritesCount}</span>
            </span>
          </div>
          <div className={classes['article-preview__body-tags']}>{tags}</div>
          <div className={classes['article-preview__body-descriptions']}>{art.description}</div>
        </div>
        <div className={classes['article-preview__body-right_block']}>
          <div className={classes['article-preview__body-avatar']}>
            <img src={art.author.image} alt="" />
          </div>
          <div className={classes['article-preview__body-nickname']}>{art.author.username}</div>
          <div className={classes['article-preview__body-date']}>{date}</div>
        </div>
      </div>
    );
  });

  return <>{articlesCollection}</>;
};

const mapStateToProps = (state) => {
  return {
    articles: state.articlesReducer.articles,
    error: state.articlesReducer.error,
    token: state.userSignControlReducer.user.token,
    signSuccess: state.userSignControlReducer.signSuccess,
  };
};

ArticlesPreview.propTypes = {
  articles: PropTypes.objectOf(PropTypes.object).isRequired,
  error: PropTypes.bool.isRequired,
  signSuccess: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  GET_ARTICLES_FETCH: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actions)(withRouter(ArticlesPreview));
