import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import * as actions from '../../store/userSignControl/actions';
import classes from './sign-in-page.module.scss';

const SignIn = ({ signSuccess, SIGN_IN_USER }) => {
  const [userLocal, setUserLocal] = useState({
    user: {
      email: '',
      password: '',
    },
  });

  const onSubmit = () => {
    SIGN_IN_USER(userLocal);
  };

  const onChangeEmailField = (el) => {
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

  if (signSuccess) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes['sign-in__wrapper']}>
      <form action={() => {}}>
        <div className={classes['sign-in__header']}>
          <b>Sign In</b>
        </div>
        <p>
          <b>Email address</b>
          <br />
          <input
            className={classes['sign-in__textfield']}
            type="text"
            size="40"
            placeholder="Email address"
            required
            onChange={onChangeEmailField}
          />
        </p>
        <p>
          <b>Password</b>
          <br />
          <input
            className={classes['sign-in__textfield']}
            type="password"
            size="40"
            placeholder="Password"
            onChange={onChangePasswordField}
            required
          />
        </p>
        <button type="button" className={classes['create-button']} onClick={onSubmit}>
          <span>Login</span>
        </button>
        <div className={classes['form-footer']}>
          Don't have an account?{' '}
          <span>
            <Link to="/sign-up">Sign Up.</Link>
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

SignIn.propTypes = {
  signSuccess: PropTypes.bool.isRequired,
  SIGN_IN_USER: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, actions)(SignIn);
