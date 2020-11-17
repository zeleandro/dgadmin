import React, { Component } from 'react';

class Contact extends Component {
    render() {
        return (
            <div className="container app-content  my-3 my-md-5">
                <div className="side-app">
                    <section className="sptb bg-white">
                        <div className="container">
                            <div className="section-title center-block text-center">
                                <h1>Información de Contacto</h1>
                                <p>En que podemos ayudarlo?</p>
                            </div>
                            <div className="support">
                                <div className="row text-white">
                                    <div className="col-xl-4 col-lg-12 col-md-12">
                                        <div className="support-service bg-dark br-2 mb-4 mb-xl-0">
                                            <i className="fab fa-instagram"></i>
                                            <h6>Instagram</h6>
                                            <a className="social-icon text-dark" href="http://www.instagram.com/dg.clean"
                                            target="_blank">@dg.clean</a>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-12 col-md-12">
                                        <div className="support-service bg-success br-2 mb-4 mb-xl-0">
                                            <i className="fab fa-facebook-square"></i>
                                            <h6>Facebook</h6>
                                            <a className="social-icon text-dark" href="http://www.facebook.com/DGClean"
                                            target="_blank">@DGClean</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="support">
                                <div className="row text-white">
                                    <div className="col-xl-4 col-lg-12 col-md-12">
                                        <div className="support-service bg-primary br-2 mb-4 mb-xl-0">
                                            <i className="fa fa-phone"></i>
                                            <h6>+54 362-422-3010</h6>
                                            <p>Envienos sus dudas!</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-12  col-md-12">
                                        <div className="support-service bg-secondary br-2 mb-4 mb-xl-0">
                                            <i className="fas fa-envelope"></i>
                                            <h6>diego_grnja@hotmail.com</h6>
                                            <p>Contactenos!</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-12 col-md-12">
                                        <div className="support-service bg-warning br-2 mb-4 mb-xl-0">
                                            <i className="fas fa-map-marked"></i>
                                            <h6>Orquideas 385 - Resistencia</h6>
                                            <p>Envíos sin cargo</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        )
    }
}

export default Contact