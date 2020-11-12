import React from 'react';
import useScrollTop from 'hooks/useScrollTop';

const Error = ({ history }) => {
	useScrollTop();

	return (
		<div className="page-not-found">
			<h1>:( Ha ocurrido un error. Intente nuevamente.</h1>
			<br />
			<button
				className="button"
				onClick={() => history.push('/')}
			>
				Intentar nuevamente
			</button>
		</div>

	);
};

export default Error;
