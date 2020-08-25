import * as dateFns from 'date-fns';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as actions from '../../store/getArticleOnClick/actions';
import LoadingIndicator from '../loading-indicator';
import classes from './article-page.module.scss';
import heart from '../articles-preview/heart.svg';

let key = 1;

const ArticlePage = ({ article, loadingEnd, GET_ARTICLE_ON_CLICK }) => {
  let { id } = useParams();
  useEffect(() => {
    GET_ARTICLE_ON_CLICK(id);
  }, [id]);

  if (loadingEnd) {
    const tags =
      article.tagList.length > 0
        ? article.tagList.map((tag) => {
            return (
              <span className={classes['article-preview__body-tags--tag']} key={key++}>
                {tag}
              </span>
            );
          })
        : null;
    const date = dateFns.format(new Date(article.createdAt), 'dd MMMM yyyy');

    return (
      <div className={classes['article-preview__body']} key={1}>
        <div className={classes['article-preview__body-left_block']}>
          <div className={classes['article-preview__body-title']}>
            <span className={classes['article-preview__body-title--name']}>
              <a href="#">{article.title}</a>
            </span>
            <span className={classes['article-preview__body-title--heart']}>
              <button type="button">
                <img src={heart} alt="" />
              </button>
              <span>{article.favoritesCount}</span>
            </span>
          </div>
          <div className={classes['article-preview__body-tags']}>{tags}</div>
          <div className={classes['article-preview__body-descriptions']}>{article.description}</div>
          <div className={classes['article-preview__body-body']}>{article.body}</div>
        </div>
        <div className={classes['article-preview__body-right_block']}>
          <div className={classes['article-preview__body-avatar']}>
            <img src={article.author.image} alt="" />
          </div>
          <div className={classes['article-preview__body-nickname']}>{article.author.username}</div>
          <div className={classes['article-preview__body-date']}>{date}</div>
        </div>
      </div>
    );
  } else {
    return <LoadingIndicator />;
  }
};

const mapStateToProps = (state) => {
  return {
    article: state.articleOnClickReducer.article,
    loadingEnd: state.articleOnClickReducer.loadingEnd,
  };
};

export default connect(mapStateToProps, actions)(ArticlePage);
