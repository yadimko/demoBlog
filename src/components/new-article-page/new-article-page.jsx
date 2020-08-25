import React, { useState } from 'react';
import _ from 'lodash/fp';
import { useForm } from 'react-hook-form';
import classes from './new-article-page.module.scss';

const NewArticle = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [article, setArticle] = useState({
    article: {
      title: '',
      description: '',
      body: '',
      tagList: [],
    },
  });
  const [tag, setTag] = useState('')

  const onSubmit = (e) => {
    console.log(article);
  };

  const onChangeTitleField = (el) => {
    setArticle({
      article: {
        ...article.article,
        title: el.target.value,
      },
    });
  };

  const onChangeDescField = (el) => {
    setArticle({
      article: {
        ...article.article,
        description: el.target.value,
      },
    });
  };

  const onChangeTextField = (el) => {
    setArticle({
      article: {
        ...article.article,
        text: el.target.value,
      },
    });
  };

  const onChangeTagField = (el) => {
    setTag(el.target.value);
  };

  const addTag = (el) => {
    setArticle({
      article: {
        ...article.article,
        tagList: [...article.article.tagList, el]
      }
    });
    setTag('')
  }

  const deleteTag = (tag) => {
    setArticle({
      article: {
        ...article.article,
        tagList: [...article.article.tagList.filter(el => {
          return el !== tag
        })]
      }
    })

  }

  console.log(article);

  const tagList = article.article.tagList.length > 0 ?
    <>
      <div className={classes['tag-item']}>
        {article.article.tagList.map(el => {
          return (
            <>
              <input className={classes['new-article-tag__textfield']} type="text" size="40" placeholder="Tag" value={el}/>
              <button className={classes['delete-button']} type="button" onClick={() => {deleteTag(el)}}>
                <span>Delete</span>
              </button>
            </>
          )
        })}
        <input className={classes['new-article-tag__textfield']} type="text" size="40" placeholder="Tag" onChange={onChangeTagField} value={tag}/>
        <button className={classes['delete-button']} type="button">
          <span>Delete</span>
        </button>
        <button className={classes['add-button']} type="button" onClick={() => {addTag(tag)}}>
          <span>Add tag</span>
        </button>
      </div>
    </>
    :
    <div className={classes['tag-item']}>
      <input className={classes['new-article-tag__textfield']} type="text" size="40" placeholder="Tag" onChange={onChangeTagField}/>
      <button className={classes['delete-button']} type="button">
        <span>Delete</span>
      </button>
      <button className={classes['add-button']} type="button" onClick={() => {addTag(tag)}}>
        <span>Add tag</span>
      </button>
    </div>

  return (
    <div className={classes['new-article__wrapper']}>
      <form action={() => {}} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes['new-article__header']}>
          <b>Create new article</b>
        </div>
        <p>
          <b>Title</b>
          <br />
          <input
            className={classes['new-article__textfield']}
            type="text"
            size="40"
            placeholder="Title"
            value={article.article.title}
            onChange={onChangeTitleField}
            name="title"
            ref={register({
              required: true,
              minLength: 3,
            })}
          />
          {_.get('title.type', errors) === 'required' && <p style={{ color: 'red' }}>This field is required</p>}
          {_.get('title.type', errors) === 'minLength' && <p style={{ color: 'red' }}>min 3 characters</p>}
        </p>
        <p>
          <b>Short descriptions</b>
          <br />
          <input
            className={classes['new-article__textfield']}
            type="text"
            size="40"
            placeholder="Title"
            value={article.article.description}
            onChange={onChangeDescField}
            name="desc"
            ref={register({
              required: true,
            })}
          />
          {_.get('desc.type', errors) === 'required' && <p style={{ color: 'red' }}>This field is required</p>}
        </p>
        <p>
          <b>Text</b>
          <br />
          <textarea
            className={classes['new-article-text__textfield']}
            type="text"
            size="40"
            placeholder="Text"
            value={article.article.text}
            onChange={onChangeTextField}
            name="text"
            ref={register({
              required: true,
            })}
          />
          {_.get('text.type', errors) === 'required' && <p style={{ color: 'red' }}>This field is required</p>}
        </p>
        <b>Tags</b>
        <form action={() => {}} className={classes['tags-block']}>
          {tagList}
        </form>
        <button className={classes['create-button']} type="button" onClick={handleSubmit(onSubmit)}>
          <span>Create</span>
        </button>
      </form>
    </div>
  );
};

export default NewArticle;
