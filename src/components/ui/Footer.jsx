import React from 'react';
import { useLocation } from 'react-router-dom';

import { HOME } from 'constants/routes';
import logo from '../../../static/logo_vertical_cropped.png';

const Footer = () => {
	const { pathname } = useLocation();

	return pathname !== HOME ? null : (
		<footer className="footer">
			<div className="footer-col-1">
				<div className="col-lg-4 col-md-12">
					<h6>Diego Grnja</h6>
					<p className="fs-14 mb-1">Ingeniero Químico</p>
				</div>
			</div>
			<div className="footer-col-2">
				<div className="col-lg-2 col-md-12">
					<h6>Redes Sociales</h6>
					<ul className="list-unstyled mb-0">
						<li><a target="blank" href="https://www.facebook.com/DGClean">Facebook: DGClean</a></li>
						<li><a target="blank" href="https://www.instagram.com/dg.clean/">Instagram: @dg.clean</a></li>
					</ul>
				</div>
			</div>
			<div className="footer-col-3">
				<div className="col-lg-3 col-md-12">
					<h6>Contacto</h6>
					<ul className="list-unstyled mb-0">
						<li>Dirección: Orquídeas 385</li>
						<li>Teléfono: +54 362 4223010</li>
						<li>Mail: diego_grnja@hotmail.com</li>
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;