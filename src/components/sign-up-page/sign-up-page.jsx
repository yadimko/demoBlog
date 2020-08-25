import React, { useRef, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import _ from 'lodash/fp';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../store/userSignControl/actions';
import classes from './sign-up-page.module.scss';

const SignUp = ({ errorsFromAPI, signSuccess, SIGN_UP_USER }) => {
  const { register, handleSubmit, watch, errors } = useForm({});
  const password = useRef({});
  password.current = watch('password', '');
  const [userLocal, setUserLocal] = useState({
    user: {
      username: '',
      email: '',
      password: '',
    },
  });
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [checkbox, setCheckbox] = useState(false);

  const onSubmit = (e) => {
    if (userLocal.user.password !== passwordRepeat) {
      alert('Пароли не совпадают');
      return;
    }
    if (userLocal.user.password.length < 8) {
      alert('Так нельзя. Пароль короче 8 символов');
      return;
    }
    if (userLocal.user.username.length < 3 || userLocal.user.username.length > 20) {
      alert('Так нельзя. минимум 3 символа, максимум 20 сомволов');
      return;
    }
    if (!checkbox) {
      alert('Галочку поставить забыли');
      return;
    }
    SIGN_UP_USER(userLocal);
  };

  const onChangeUsernameField = (el) => {
    setUserLocal({
      user: {
        ...userLocal.user,
        username: el.target.value,
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

  const onChangePasswordRepeatField = (el) => {
    setPasswordRepeat(el.target.value);
  };

  if (signSuccess) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes['sign-up__wrapper']}>
      <form action={() => {}} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes['sign-up__header']}>
          <b>Create new account</b>
        </div>
        <p>
          <b>Username</b>
          <br />
          <input
            className={classes['sign-up__textfield']}
            type="text"
            size="40"
            placeholder="Username"
            name="username"
            value={userLocal.user.username}
            onChange={onChangeUsernameField}
            required
            ref={register({
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
          />
          {errorsFromAPI.username ? (
            <p style={{ color: 'red', marginBottom: '2px' }}>{errorsFromAPI.username.toString()}</p>
          ) : null}
          {_.get('username.type', errors) === 'required' && <p style={{ color: 'red' }}>This field is required</p>}
          {_.get('username.type', errors) === 'minLength' && <p style={{ color: 'red' }}>min 3 characters</p>}
          {_.get('username.type', errors) === 'maxLength' && <p style={{ color: 'red' }}>max 20 characters</p>}
        </p>
        <p>
          <b>Email address</b>
          <br />
          <input
            className={classes['sign-up__textfield']}
            type="email"
            size="40"
            placeholder="Email address"
            value={userLocal.user.email}
            onChange={onChangeEMailField}
            required
          />
          {errorsFromAPI.email ? (
            <p style={{ color: 'red', marginBottom: '2px' }}>{errorsFromAPI.email.toString()}</p>
          ) : null}
        </p>
        <p>
          <b>Password</b>
          <br />
          <input
            className={classes['sign-up__textfield']}
            type="password"
            size="40"
            placeholder="Password"
            name="password"
            onChange={onChangePasswordField}
            required
            ref={register({
              required: true,
              minLength: 8,
            })}
          />
          {errorsFromAPI.password ? (
            <p style={{ color: 'red', marginBottom: '2px' }}>{errorsFromAPI.password.toString()}</p>
          ) : null}
          {_.get('password.type', errors) === 'required' && <p style={{ color: 'red' }}>This field is required</p>}
          {_.get('password.type', errors) === 'minLength' && (
            <p style={{ color: 'red' }}>Password must have at least 8 characters</p>
          )}
        </p>
        <p>
          <b>Repeat Password</b>
          <br />
          <input
            className={classes['sign-up__textfield']}
            type="password"
            size="40"
            placeholder="Password"
            name="password_repeat"
            value={passwordRepeat}
            onChange={onChangePasswordRepeatField}
            required
            ref={register({
              validate: (value) => value === password.current || 'The passwords do not match',
            })}
          />
          {_.get('password_repeat.type', errors) === 'validate' && (
            <p style={{ color: 'red' }}>The passwords do not match</p>
          )}
        </p>
        <hr />
        <label className={classes['checkbox-wrapper']}>
          <input
            type="checkbox"
            checked={checkbox}
            onChange={() => {
              setCheckbox(!checkbox);
            }}
          />
          <span className="checkmark">I agree to the processing of my personal information</span>
        </label>
        <button type="submit" className={classes['sign-up--button']} onClick={onSubmit}>
          <span>Create</span>
        </button>
        <div className={classes['form-footer']}>
          Already have an account?{' '}
          <span>
            <Link to="/sign-in">Sign In.</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    errorsFromAPI: state.userSignControlReducer.errorsFromAPI,
    signSuccess: state.userSignControlReducer.signSuccess,
  };
};

SignUp.propTypes = {
  errorsFromAPI: PropTypes.arrayOf.isRequired,
  signSuccess: PropTypes.bool.isRequired,
  SIGN_UP_USER: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, actions)(SignUp);
