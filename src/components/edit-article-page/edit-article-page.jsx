import React, { useState } from 'react';
import classes from './edit-article-page.module.scss';

const EditArticle = () => {

  return (
    <div className={classes['edit-article__wrapper']}>
      <form action={() => {}}>
        <div className={classes['edit-article__header']}>
          <b>Edit article</b>
        </div>
        <p>
          <b>Title</b>
          <br />
          <input className={classes['edit-article__textfield']} type="text" size="40" placeholder="Title" />
        </p>
        <p>
          <b>Short descriptions</b>
          <br />
          <input className={classes['edit-article__textfield']} type="text" size="40" placeholder="Title" />
        </p>
        <p>
          <b>Text</b>
          <br />
          <textarea className={classes['edit-article__textfield']} type="text" size="40" placeholder="Text" />
        </p>
        <b>Tags</b>
        <p className={classes['tags-block']}>
          <input className={classes['edit-article-tag__textfield']} type="text" size="40" placeholder="Tag" />
          <button className={classes['delete-button']} type="button">
            <span>Delete</span>
          </button>
          <button className={classes['add-button']} type="button">
            <span>Add tag</span>
          </button>
        </p>
        <button className={classes['send-button']} type="button">
          <span>Send</span>
        </button>
      </form>
    </div>
  );
};

export default EditArticle;
