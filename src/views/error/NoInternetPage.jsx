import React from 'react';
import useScrollTop from 'hooks/useScrollTop';

const NoInternet = () => {
	useScrollTop();

	return (
		<div className="page-not-found">
			<h1>:( No hay conexión a Internet.</h1>
			<p>Revise su conexión e intente nuevamente.</p>
			<br />
			<button
				className="button"
				onClick={() => window.location.reload(true)}
			>
				Intentar nuevamente
			</button>
		</div>

	);
};

export default NoInternet;
