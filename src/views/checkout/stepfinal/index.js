import React from 'react';
import useScrollTop from 'hooks/useScrollTop';
import { HOME } from 'constants/routes';

const StepFinal = ({ history }) => {
    useScrollTop();

    const goHome = () => {
        history.push(HOME)
    }

    return (
        <div className="row">
            <div className="col-lg-4 col-md-12">
                <div className="card">
                    <div className="card-body">
                        <div className="service-card text-center">
                            <div className="bg-purple-transparent icon-bg icon-service text-purple">
                                <i className="fa fa-shopping-cart "></i>
                            </div>
                            <div className="servic-data mt-3">
                                <h2 className="font-weight-semibold mb-2">Se ha registrado su pedido</h2>
                                {/* <p className="text-muted">En breve nos contactaremos para coordinar el envío</p> */}
                                {/* <a href="#" className="btn btn-primary btn-sm" onClick={goHome}>Ir al inicio</a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-12">
                <div className="card">
                    <div className="card-body">
                        <div className="service-card text-center">
                            <div className="bg-warning-transparent icon-bg icon-service text-warning">
                                <i className="fas fa-truck"></i>
                            </div>
                            <div className="servic-data mt-3">
                                <h3 className="font-weight-semibold mb-2">En breve nos contactaremos para coordinar el envío</h3>
                                {/* <p className="text-muted">Nam libero tempore, cum soluta nobis est eligendi cumque facere possimus</p> */}
                                {/* <a href="#" className="btn btn-primary btn-sm">View More</a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-12">
                <div className="card">
                    <div className="card-body">
                        <div className="service-card text-center">
                            <div className="bg-secondary-transparent icon-bg icon-service text-pink">
                                <i className="far fa-smile-wink"></i>
                            </div>
                            <div className="servic-data mt-3">
                                <h2 className="font-weight-semibold mb-2">Gracias por elegir DG Clean</h2>
                                {/* <p className="text-muted">Nam libero tempore, cum soluta nobis est eligendi cumque facere possimus</p>
                                <a href="#" className="btn btn-primary btn-sm">View More</a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-3 col-md-12">
                <div className="card">
                    <div className="card-body">
                        <div className="item-box text-center">
                            <div className="stamp text-center stamp-lg bg-primary "><i className="fa fa-users"></i></div>
                            <div className="item-box-wrap">
                                <a href="#" className="btn btn-primary btn-sm" onClick={goHome}><h5 className="mb-2">Ir al inicio</h5></a>
                                {/* <p className="text-muted mb-0">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-12">
                <div className="card">
                    <div className="card-body">
                        <div className="item-box text-center">
                            <div className="stamp text-center stamp-lg bg-success"><i className="far fa-heart"></i></div>
                            <div className="item-box-wrap">
                                <h5 className="mb-2">Síguenos</h5>
                                <p className="text-muted mb-0">En nuestras redes sociales</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-12">
                <div className="card">
                    <div className="card-body">
                        <div className="item-box text-center">
                            <div className="stamp text-center stamp-lg bg-info"><i className="fab fa-facebook-square"></i></div>
                            <div className="item-box-wrap">
                                <h5 className="mb-2">Facebook</h5>
                                <p className="text-muted mb-0"><a className="social-icon text-dark" href="http://www.facebook.com/DGClean"
                                    target="_blank">@DGClean</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-12">
                <div className="card">
                    <div className="card-body">
                        <div className="item-box text-center">
                            <div className="stamp text-center stamp-lg bg-danger"><i className="fab fa-instagram"></i></div>
                            <div className="item-box-wrap">
                                <h5 className="mb-2">Instagram</h5>
                                <p className="text-muted mb-0"><a className="social-icon text-dark" href="http://www.instagram.com/dg.clean"
                                    target="_blank">@dg.clean</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <div className="card widgets-cards">
                    <div className="card-body d-flex">
                        <div className="widgets-cards-icons">
                            <div className="wrp icon-circle bg-success">
                                <i className="fab fa-whatsapp"></i>
                            </div>
                        </div>
                        <div className="widgets-cards-data">
                            <div className="wrp text-wrapper">
                                <a target="_blank" href="https://wa.me/543624223010"><p>3624223010</p></a>
                                <p className="text-muted mt-1 mb-0">Contáctenos al WhatsApp</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <div className="card widgets-cards">
                    <div className="card-body d-flex">
                        <div className="widgets-cards-icons">
                            <div className="wrp icon-circle bg-warning">
                                <i className="far fa-envelope"></i>
                            </div>
                        </div>
                        <div className="widgets-cards-data">
                            <div className="wrp text-wrapper">
                                <p>Email</p>
                                <p className="text-muted mt-1 mb-0">diegogrnja@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepFinal;