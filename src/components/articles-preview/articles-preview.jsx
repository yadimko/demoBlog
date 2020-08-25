import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as dateFns from 'date-fns';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './articles-preview.module.scss';
import * as actions from '../../store/getArticles/actions';
import heart from './heart.svg';
import love from './love_heart.svg';

import BlogService from '../../blog-service/blog-service';
const bs = new BlogService();

let key = 1;

const ArticlesPreview = ({ articles, signSuccess, token, GET_ARTICLES_FETCH }) => {
  useEffect(() => {
    GET_ARTICLES_FETCH();
  }, []);

  function likeDislike(slug, like) {
    if (!signSuccess) {
      return null;
    }
    if (!like) {
      bs.like(slug, token);
    }
    if (like) {
      bs.dislike(slug, token);
    }
    return null;
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
                onClick={() => {
                  likeDislike(art.slug, art.favorited);
                }}
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
    token: state.userSignControlReducer.user.token,
    signSuccess: state.userSignControlReducer.signSuccess,
  };
};

ArticlesPreview.propTypes = {
  articles: PropTypes.objectOf(PropTypes.object).isRequired,
  signSuccess: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  GET_ARTICLES_FETCH: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actions)(withRouter(ArticlesPreview));
