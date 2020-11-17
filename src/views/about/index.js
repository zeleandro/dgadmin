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
											<h2 className="mb-4 font-weight-semibold">Por que {this.props.empresa}?</h2>
											<h4 className="leading-normal">majority have suffered alteration in some form, by injected humour</h4>
											<p className="leading-normal">There are many variations of passages of Lorem Ipsum available, but the majority have suffered  by injected humour, or randomised words which don't look even slightly believable.
											If you are going to use a passage of Lorem Ipsum, you need to as necessary All the Lorem Ipsum generators on the Internet tend to repeat</p>
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
											<p>I must explain to you how all this mistaken idea of denouncing pleasure and you a complete account of the system</p>
										</div>
									</div>
								</div>
								<div className="col-md-12 cols-ms-12 col-lg-4">
									<div className="card text-center">
										<img src={image3} alt="img" className="br-tl-2 br-tr-2" ></img>
										<div className="card-body">
											<h3 className="mb-3">Sobre {this.props.nombre}</h3>
											<p>I must explain to you how all this mistaken idea of denouncing pleasure and you a complete account of the system</p>
										</div>
									</div>
								</div>
								<div className="col-md-12 cols-ms-12 col-lg-4">
									<div className="card text-center">
										<img src={image4} alt="img" className="br-tl-2 br-tr-2" ></img>
										<div className="card-body">
											<h3 className="mb-3">Crecimiento</h3>
											<p>I must explain to you how all this mistaken idea of denouncing pleasure and you a complete account of the system</p>
										</div>
									</div>
								</div>
							</div>
							<div className="card">
								<div className="row">
									<div className="col-md-12 col-lg-6  pr-0 ">
										<div className="card-body p-7 pabout">
											<h2 className="mb-4 font-weight-semibold">Que ofrecemos?</h2>
											<h4 className="leading-normal">majority have suffered alteration in some form, by injected humour</h4>
											<p className="leading-normal">There are many variations of passages of Lorem Ipsum available, but the majority have suffered  by injected humour, or randomised words which don't look even slightly believable.
											If you are going to use a passage of Lorem Ipsum, you need to as necessary All the Lorem Ipsum generators on the Internet tend to repeat</p>
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