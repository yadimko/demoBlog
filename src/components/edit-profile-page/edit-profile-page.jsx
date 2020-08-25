import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../store/userSignControl/actions';
import classes from './edit-profile-page.module.scss';

const EditProfile = ({ errorsFromAPI, signSuccess, token, UPDATE_USER }) => {
  const [userLocal, setUserLocal] = useState({
    user: {
      username: '',
      email: '',
      password: '',
      bio: '',
      image: '',
    },
  });

  const onSubmit = () => {
    if (userLocal.user.username.length < 2) {
      alert('Имя должно быть длинее');
      return;
    }
    if (userLocal.user.password.length < 8) {
      alert('Пароль должен быть длинее');
      return;
    }
    UPDATE_USER(userLocal, token);
  };

  const onChangeUsernameField = (el) => {
    setUserLocal({
      user: {
        ...userLocal.user,
        username: el.target.value,
      },
    });
  };

  const onChangeBioField = (el) => {
    setUserLocal({
      user: {
        ...userLocal.user,
        bio: el.target.value,
      },
    });
  };

  const onChangeEMailField = (el) => {
    setUserLocal({
      user: {
        ...userLocal.user,
        email: el.target.value,
      },
    });
  };

  const onChangePasswordField = (el) => {
    setUserLocal({
      user: {
        ...userLocal.user,
        password: el.target.value,
      },
    });
  };

  const onChangeAvatarField = (el) => {
    setUserLocal({
      user: {
        ...userLocal.user,
        image: el.target.value,
      },
    });
  };

  if (!signSuccess) {
    return (
      <img src="https://s00.yaplakal.com/pics/pics_preview/1/6/5/13137561.jpg" alt="" style={{ margin: 'auto' }} />
    );
  }
  return (
    <div className={classes['edit-profile__wrapper']}>
      <form action={() => {}}>
        <div className={classes['edit-profile__header']}>
          <b>Edit profile</b>
        </div>
        <p>
          <b>Username</b>
          <br />
          <input
            className={classes['edit-profile__textfield']}
            value={userLocal.user.username}
            type="text"
            size="40"
            placeholder="Username"
            onChange={onChangeUsernameField}
            required
          />
          {errorsFromAPI.username ? (
            <p style={{ color: 'red', marginBottom: '2px' }}>{errorsFromAPI.username.toString()}</p>
          ) : null}
        </p>
        <p>
          <b>Bio</b>
          <br />
          <input
            className={classes['edit-profile__textfield']}
            value={userLocal.user.bio}
            type="text"
            size="40"
            onChange={onChangeBioField}
            required
            placeholder="Bio"
          />
        </p>
        <p>
          <b>Email address</b>
          <br />
          <input
            className={classes['edit-profile__textfield']}
            type="email"
            size="40"
            value={userLocal.user.email}
            onChange={onChangeEMailField}
            placeholder="Email address"
            required
          />
          {errorsFromAPI.email ? (
            <p style={{ color: 'red', marginBottom: '2px' }}>{errorsFromAPI.email.toString()}</p>
          ) : null}
        </p>
        <p>
          <b>New password</b>
          <br />
          <input
            className={classes['edit-profile__textfield']}
            type="password"
            onChange={onChangePasswordField}
            size="40"
            value={userLocal.user.password}
            required
            placeholder="Password"
          />
          {errorsFromAPI.password ? (
            <p style={{ color: 'red', marginBottom: '2px' }}>{errorsFromAPI.password.toString()}</p>
          ) : null}
        </p>
        <p>
          <b>Avatar image (url)</b>
          <br />
          <input
            className={classes['edit-profile__textfield']}
            type="url"
            size="40"
            onChange={onChangeAvatarField}
            placeholder="url"
          />
        </p>
        <button className={classes['edit-profile__button']} type="button" onClick={onSubmit}>
          <span>Save</span>
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    signSuccess: state.userSignControlReducer.signSuccess,
    token: state.userSignControlReducer.user.token,
    errorsFromAPI: state.userSignControlReducer.errorsFromAPI,
  };
};

EditProfile.propTypes = {
  errorsFromAPI: PropTypes.arrayOf.isRequired,
  signSuccess: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  UPDATE_USER: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, actions)(EditProfile);
