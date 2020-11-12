import React from 'react';
import useScrollTop from 'hooks/useScrollTop';

const PageNotFound = ({ history }) => {
	useScrollTop();

	return (
		<div className="page-not-found">
			<h1>:( La página que estas buscando no existe.</h1>
			<br />
			<button
				className="button"
				onClick={history.goBack}
			>
				Volver
			</button>
		</div>
	);
};

export default PageNotFound;
