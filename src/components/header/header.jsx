import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../store/userSignControl/actions';
import classes from './header.module.scss';
import avatar from '../../img/default_avatar.png';

const Header = ({ signSuccess, user, LOG_OUT }) => {
  const userAvatar = !user.image ? <img src={avatar} alt="default avatar" /> : <img src={user.image} alt="avatar" />;
  const headerBlock = signSuccess ? (
    <>
      <button type="button" className={classes['header-create-article__button']}>
        <Link to="/new-article">Create article</Link>
      </button>
      <div className={classes['header-user-info']}>
        <span className={classes['header-username']}>{user.username}</span>
        <span className={classes['header-avatar']}>
          <Link to="/profile">{userAvatar}</Link>
        </span>
      </div>
      <button type="button" className={classes['header-log-out__button']} onClick={LOG_OUT}>
        <Link to="/">Log Out</Link>
      </button>
    </>
  ) : (
    <>
      <button type="button" className={classes['header-sign-in__button']}>
        <Link to="/sign-in">Sign In</Link>
      </button>
      <button type="button" className={classes['header-sign-up__button']}>
        <Link to="/sign-up">Sign Up</Link>
      </button>
    </>
  );
  return (
    <div className={classes.header}>
      <div className={classes['header-name']}>
        <Link to="/">Realworld Blog</Link>
      </div>
      <div className={classes['header-button-group']}>{headerBlock}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userSignControlReducer.user,
    signSuccess: state.userSignControlReducer.signSuccess,
  };
};

Header.propTypes = {
  signSuccess: PropTypes.bool.isRequired,
  user: PropTypes.objectOf.isRequired,
  LOG_OUT: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, actions)(Header);
