import React from 'react';
import logo from '../../../static/logo_vertical.png';
import CircularProgress from './CircularProgress';

const Preloader = () => (
	<div className="preloader">
		<img width="20" height="20" src={logo} />
		<CircularProgress />
	</div>
);

export default Preloader;
