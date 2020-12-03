import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetFilter, applyFilter } from 'redux/actions/filterActions';
import logo from '../../../static/favicon.png'

const Menu = (props) => {
	const dispatch = useDispatch();
	const [isMenu, setMenu] = useState(false);

	const handleMenu = e => {
		// isMenu ? setMenu(false) : setMenu(true)
		if (isMenu) {
			dispatch(resetFilter());
			setMenu(false)
		} else {
			dispatch(resetFilter());
			setMenu(true)
		}
	}
	return (
		<React.Fragment>
			<div className={`horizontal-header clearfix sticky trelu${props.movil}`}>
				<div className="container">
					<a id="horizontal-navtoggle" onClick={handleMenu} className="animated-arrow"><span></span></a>
					<span className="smllogo"><img src="../assets/images/brand/logo1.png" width="120" alt="" /></span>
				</div>
			</div>
			<div>
				<div className={`horizontal-main clearfix${props.estilo}`} >
					<div className="horizontal-mainwrapper container clearfix">
						<div className="desktoplogo">
							<div className="text-center">
								<Link to="/" onClick={handleMenu}>
									<div className="row img-header">
										<img src={logo} alt="" />
										<h2 className="font-weight-bold">DG Limpieza</h2>
									</div>
								</Link>
							</div>
						</div>
						<nav className={`horizontalMenu clearfix d-md-flex${isMenu ? ' menu-activo' : ''}`}>
							<div className={`overlapblackbg${isMenu ? ' dos-activo' : ''}`} onClick={handleMenu} ></div>
							<ul className={`horizontalMenu-list${isMenu ? ' tres-activo' : ''}`}>
								<li aria-haspopup="true">
									<Link to="/" onClick={handleMenu}>
										Productos
                                </Link>
								</li>
								<li aria-haspopup="true">
									<Link to="/category" onClick={handleMenu}>
										Categorías
                                </Link>
								</li>
								<li aria-haspopup="true">
									<Link to="/sale" onClick={handleMenu}>
										Ofertas
                                </Link>
								</li>
								<li aria-haspopup="true">
									<Link to="/about" onClick={handleMenu}>
										Sobre DG
                                </Link>
								</li>
								<li aria-haspopup="true" onClick={handleMenu}>
									<Link to="/contact" >
										Contacto
                                </Link>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</React.Fragment>
	)

}
export default Menu