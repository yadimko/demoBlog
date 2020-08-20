import React from 'react';
import classes from './header.module.scss';

import { Link } from 'react-router-dom';

const Header = () => {
	return(
		<div className={classes.header}>
			<div className={classes['header-name']}><Link to='/'>Realworld Blog</Link></div>
			<div className={classes['header-button']}><button type='button'>Sign In</button><button type='button'>Sign Up</button></div>
		</div>
	)
}

export default Header;