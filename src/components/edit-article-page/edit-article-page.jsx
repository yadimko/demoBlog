import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as actions from '../../store/articleOnClick/actions';
import classes from './edit-article-page.module.scss';

const EditArticle = ({ article, editStatus, token, EDIT_ARTICLE }) => {
  const [articleLocal, setArticleLocal] = useState({
    article: {
      title: article.title,
      description: article.description,
      body: article.body,
      tagList: [...article.tagList],
    },
  });
  const [tag, setTag] = useState('');

  if (editStatus) {
    return <Redirect to="/" />;
  }

  const onSubmit = (el) => {
    EDIT_ARTICLE(articleLocal, article.slug, token);
  };

  const onChangeTitleField = (el) => {
    setArticleLocal({
      article: {
        ...articleLocal.article,
        title: el.target.value,
      },
    });
  };

  const onChangeDescField = (el) => {
    setArticleLocal({
      article: {
        ...articleLocal.article,
        description: el.target.value,
      },
    });
  };

  const onChangeTextField = (el) => {
    setArticleLocal({
      article: {
        ...articleLocal.article,
        body: el.target.value,
      },
    });
  };

  const onChangeTagField = (el) => {
    setTag(el.target.value);
  };

  const addTag = (el) => {
    setArticleLocal({
      article: {
        ...articleLocal.article,
        tagList: [...articleLocal.article.tagList, el],
      },
    });
    setTag('');
  };

  const deleteTag = (tag) => {
    setArticleLocal({
      article: {
        ...articleLocal.article,
        tagList: [
          ...articleLocal.article.tagList.filter((el) => {
            return el !== tag;
          }),
        ],
      },
    });
  };

  const tagList =
    articleLocal.article.tagList.length > 0 ? (
      <>
        <div className={classes['tag-item']}>
          {articleLocal.article.tagList.map((el) => {
            return (
              <>
                <input
                  className={classes['edit-article-tag__textfield']}
                  type="text"
                  size="40"
                  placeholder="Tag"
                  value={el}
                />
                <button
                  className={classes['delete-button']}
                  type="button"
                  onClick={() => {
                    deleteTag(el);
                  }}
                >
                  <span>Delete</span>
                </button>
              </>
            );
          })}
          <input
            className={classes['edit-article-tag__textfield']}
            type="text"
            size="40"
            placeholder="Tag"
            onChange={onChangeTagField}
            value={tag}
          />
          <button className={classes['delete-button']} type="button">
            <span>Delete</span>
          </button>
          <button
            className={classes['add-button']}
            type="button"
            onClick={() => {
              addTag(tag);
            }}
          >
            <span>Add tag</span>
          </button>
        </div>
      </>
    ) : (
      <div className={classes['tag-item']}>
        <input
          className={classes['edit-article-tag__textfield']}
          type="text"
          size="40"
          placeholder="Tag"
          onChange={onChangeTagField}
        />
        <button className={classes['delete-button']} type="button">
          <span>Delete</span>
        </button>
        <button
          className={classes['add-button']}
          type="button"
          onClick={() => {
            addTag(tag);
          }}
        >
          <span>Add tag</span>
        </button>
      </div>
    );

  return (
    <div className={classes['edit-article__wrapper']}>
      <form action={() => {}}>
        <div className={classes['edit-article__header']}>
          <b>Edit article</b>
        </div>
        <p>
          <b>Title</b>
          <br />
          <input
            className={classes['edit-article__textfield']}
            type="text"
            size="40"
            placeholder="Title"
            value={articleLocal.article.title}
            onChange={onChangeTitleField}
          />
        </p>
        <p>
          <b>Short descriptions</b>
          <br />
          <input
            className={classes['edit-article__textfield']}
            type="text"
            size="40"
            placeholder="Description"
            value={articleLocal.article.description}
            onChange={onChangeDescField}
          />
        </p>
        <p>
          <b>Text</b>
          <br />
          <textarea
            className={classes['edit-article-text__textfield']}
            type="text"
            size="40"
            placeholder="Text"
            value={articleLocal.article.body}
            onChange={onChangeTextField}
          />
        </p>
        <b>Tags</b>
        <form action={() => {}} className={classes['tags-block']}>
          {tagList}
        </form>
        <button
          className={classes['send-button']}
          type="button"
          onClick={() => {
            onSubmit();
          }}
        >
          <span>Send</span>
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    article: state.articleOnClickReducer.article,
    editStatus: state.articleOnClickReducer.editStatus,
    token: state.userSignControlReducer.user.token,
    username: state.userSignControlReducer.user.username,
  };
};

EditArticle.propTypes = {
  article: PropTypes.objectOf(PropTypes.object).isRequired,
  editStatus: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  EDIT_ARTICLE: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actions)(EditArticle);
