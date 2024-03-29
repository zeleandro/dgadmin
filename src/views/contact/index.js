import React, { Component } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { TileLayer, Marker, Popup } from 'react-leaflet'

class Contact extends Component {
    
    render() {
        const position = [-27.4329993,-58.9939531];
        const market = [-27.4209528, -58.9794135]
        return (
            <div className="container app-content  my-3 my-md-5">
                <div className="side-app">
                    <section className="sptb bg-white">
                        <div className="container">
                            <div className="section-title center-block text-center">
                                <h1>Información de Contacto</h1>
                                <p>En que podemos ayudarte?</p>
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
                                            <a className="social-icon text-dark" href="https://www.facebook.com/dgclean.limpieza"
                                                target="_blank">@dgclean.limpieza</a>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-12 col-md-12">
                                        <div className="support-service bg-danger br-2 mb-4 mb-xl-0">
                                            <i className="fas fa-info-circle"></i>
                                            <h6>Su consulta no es molestia!</h6>
                                            <p>Atención las 24 hs</p>
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

                    {/* <section className="sptb bg-white">
                        <div className="container">
                            <div className="section-title center-block text-center">
                                    <h1>Nuestra ubicación</h1>
                            </div>

                            <div className="section-title center-block text-center">
                                <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
                                <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                    <Marker position={market}>
                                    <Popup>
                                        DG Limpieza <br /> <a href="https://www.google.com/maps/search/?api=1&query=-27.4209528, -58.9794135&zoom=20" target="_blank">Abrir mapa</a>.
                                    </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        </div>  
                    </section> */}
                </div>
            </div>
        )
    }
}

export default Contact