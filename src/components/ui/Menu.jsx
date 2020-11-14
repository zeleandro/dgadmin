import React, {useState} from 'react';
import { Redirect, Link } from 'react-router-dom';


const Menu = (props) => {

	const [isMenu, setMenu] = useState(false);

	const handleMenu = e =>{
		isMenu ? setMenu(false):setMenu(true)
	}
	return(
		<React.Fragment>
		<div className={`horizontal-header clearfix sticky trelu${props.movil}`}>
					<div className="container">
						<a id="horizontal-navtoggle" onClick={handleMenu} className="animated-arrow"><span></span></a>
						<span className="smllogo"><img src="../assets/images/brand/logo1.png" width="120" alt=""/></span>
					</div>
				</div>
		<div>
			<div className={`horizontal-main clearfix${props.estilo}`} >
				<div className="horizontal-mainwrapper container clearfix">
					<div className="desktoplogo">
						<div className="text-center"><h2 className=""><span className="font-weight-bold">DG Limpieza</span> </h2></div>
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
								<Link to="/sale" onClick={handleMenu}>
									Ofertas
                                </Link>
							</li>
							{/* <li aria-haspopup="true">
								<Link to="/novedades" onClick={handleMenu}>
									Novedades
                                </Link>
							</li> */}
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