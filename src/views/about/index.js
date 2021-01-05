import React, { Component } from 'react';
import image1 from '../../../static/image1.jpg'
import image2 from '../../../static/image2.jpg'
import image3 from '../../../static/image3.jpg'
import image4 from '../../../static/image4.jpg'
import image5 from '../../../static/image5.jpg'

class About extends Component {
    render() {
        return (
                <div className="container app-content  my-3 my-md-5">
					<div className="side-app">
						<div className="page-header">

						</div>

						<div className="">
							<div className="card">
								<div className="row">
									<div className="col-md-12 col-lg-6 pr-0 d-none d-lg-block">
										<img src={image1} alt="img" className="br-tl-2 br-bl-2 "></img>
									</div>
									<div className="col-md-12 col-lg-6  pl-0 ">
										<div className="card-body p-7 about-con pabout">
											<h2 className="mb-4 font-weight-semibold">Por que <strong>DG Limpieza</strong>?</h2>
											<h3 className="leading-normal">Porque tratamos a cada cliente como si fuera único</h3>
											<p className="leading-normal">Porque estamos concentrados 100% en la calidad.
											La calidad es nuestro compromiso con las empresas que confían en nosotros. Evaluamos todo, nuestros procesos están sometidos a una constante evaluación, así como nuestros productos y compromiso.</p>
											<p className="leading-normal">Porque su casa y su empresa son importantes para nosotros.</p>
											<p className="leading-normal">En nuestros clientes, grandes o pequeños, encontrará excelentes relatos y buenas experiencias con nuestra empresa.</p>
											<p className="leading-normal">Confiamos en que ofrecer un trato personal, amable, flexible, adaptado a las necesidades del cliente puede suponer la diferencia que haga que los clientes escojan nuestra empresa.</p>
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-12 cols-ms-12 col-lg-4">
									<div className="card text-center">
										<img src={image2} alt="img" className="br-tl-2 br-tr-2" ></img>
										<div className="card-body">
											<h3 className="mb-3">Historia</h3>
											<p>Desde nuestros inicios trabajamos para ser una empresa ética y honesta, mantenemos relaciones a largo plazo con nuestros clientes y recibimos muchas recomendaciones que nos demuestran que vamos en un correcto camino de mejora contínua. Logramos ser una buena empresa con quién trabajar.</p>
										</div>
									</div>
								</div>
								<div className="col-md-12 cols-ms-12 col-lg-4">
									<div className="card text-center">
										<img src={image3} alt="img" className="br-tl-2 br-tr-2" ></img>
										<div className="card-body">
											<h3 className="mb-3">Sobre <strong>DG Limpieza</strong></h3>
											<p>Buscamos la excelencia. Nuestros trabajos y negocios son muy importantes para nosotros, por lo tanto, todo lo que hacemos por nuestros clientes lo consideramos muy valioso. No dudamos en tomar su éxito como nuestro, así que sepa que haremos todo lo posible para que Ud. desarrolle sus actividades del hogar o su empresa con nuestra colaboración.</p>
										</div>
									</div>
								</div>
								<div className="col-md-12 cols-ms-12 col-lg-4">
									<div className="card text-center">
										<img src={image4} alt="img" className="br-tl-2 br-tr-2" ></img>
										<div className="card-body">
											<h3 className="mb-3">Crecimiento</h3>
											<p>Nuestra visión es convertirnos en una empresa modelo, referente en la zona, no solo por la calidad de nuestros productos y asesoramiento, sino también cumpliendo con la Responsabilidad Social Empresaria</p>
										</div>
									</div>
								</div>
							</div>
							<div className="card">
								<div className="row">
									<div className="col-md-12 col-lg-6  pr-0 ">
										<div className="card-body p-7 pabout">
											<h2 className="mb-4 font-weight-semibold">Que ofrecemos?</h2>
											<h3 className="leading-normal">Aseguramos el cumplimiento de los plazos establecidos</h3>
											<p className="leading-normal">DG Limpieza realiza entregas en toda la ciudad de Resistencia y el Gran Resistencia con una compra mínima</p>
											<p className="leading-normal">Brindamos asesoramiento para toda necesidad</p>
											<p className="leading-normal">Calidad, compromiso y rapidez al mejor precio!</p>
										</div>
									</div>
									<div className="col-md-12 col-lg-6 pl-0 d-none d-lg-block">
										<img src={image5} alt="img" className=" br-br-2 br-tr-2"></img>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
        )
    }
}

export default About