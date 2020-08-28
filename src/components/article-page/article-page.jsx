import * as dateFns from 'date-fns';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { Redirect, useParams, Link } from 'react-router-dom';
import * as actions from '../../store/articleOnClick/actions';
import LoadingIndicator from '../loading-indicator';
import classes from './article-page.module.scss';
import heart from '../../img/heart.svg';

import 'antd/dist/antd.css';

let key = 1;

const ArticlePage = ({
  article,
  loadingEnd,
  deleteStatus,
  token,
  username,
  signSuccess,
  GET_ARTICLE_ON_CLICK,
  DELETE_ARTICLE,
}) => {
  let { id } = useParams();
  useEffect(() => {
    GET_ARTICLE_ON_CLICK(id);
  }, [id]);

  if (deleteStatus) {
    return <Redirect to="/" />;
  }
  const deleteBtn = (slug) => {
    DELETE_ARTICLE(slug, token);
  };

  function showDeleteConfirm() {
    const { confirm } = Modal;
    confirm({
      title: 'Are you sure to delete this article?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteBtn(article.slug);
      },
    });
  }

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

    const path = `/articles/${article.slug}/edit`;
    const btn =
      signSuccess && article.author.username === username ? (
        <>
          <button
            type="button"
            className={classes['article-preview__btn-block_delete']}
            onClick={() => {
              showDeleteConfirm();
            }}
          >
            <span>Delete</span>
          </button>
          <button type="button" className={classes['article-preview__btn-block_edit']}>
            <Link to={path}>
              <span>Edit</span>
            </Link>
          </button>
        </>
      ) : null;

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
          <div className={classes['article-preview__btn-block']}>{btn}</div>
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
    deleteStatus: state.articleOnClickReducer.deleteStatus,
    loadingEnd: state.articleOnClickReducer.loadingEnd,
    token: state.userSignControlReducer.user.token,
    username: state.userSignControlReducer.user.username,
    signSuccess: state.userSignControlReducer.signSuccess,
  };
};

ArticlePage.propTypes = {
  articles: PropTypes.objectOf(PropTypes.object).isRequired,
  loadingEnd: PropTypes.bool.isRequired,
  deleteStatus: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  signSuccess: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  GET_ARTICLE_ON_CLICK: PropTypes.func.isRequired,
  DELETE_ARTICLE: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actions)(ArticlePage);
