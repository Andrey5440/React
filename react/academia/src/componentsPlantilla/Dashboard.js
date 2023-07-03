import React from 'react';
import '../App.css';
import bibliotecaImage from '../img/biblioteca.jpg';
import talleresImage from '../img/talleres.jpg';
import clasesImage from '../img/clases.jpg';
import logo from '../logo.svg';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='fluid-container' id='wave'>
                <section id="hero" className="fluid-container">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <h1 className="fw-bold mb-4">Bienvenidos a la Academia Galaxy</h1>
                                <p className="lead mb-4">Disfruta de una educación de calidad en nuestra academia ubicada en el corazón de la ciudad.</p>
                                <a href="/" className="btn btn-primary btn-lg">Inscribirse ahora</a>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="servicios" className="py-5">
                    <div className="container">
                        <h2 className="fw-bold text-center mb-4">Nuestros servicios</h2>
                        <div className="row">
                            <div className="col-md-4 mb-4">
                                <div className="card h-100">
                                    <img src={clasesImage} className="card-img-top" alt="Imagen del servicio" />
                                    <div className="card-body">
                                        <h3 className="card-title fw-bold mb-3">Clases</h3>
                                        <p className="card-text">En nuestra academia ofrecemos una amplia variedad de clases para diferentes áreas de estudio. Contamos con profesores altamente calificados y materiales actualizados para brindarte una educación de calidad.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-4">
                                <div className="card h-100">
                                    <img src={talleresImage} className="card-img-top" alt="Imagen del servicio" />
                                    <div className="card-body">
                                        <h3 className="card-title fw-bold mb-3">Talleres</h3>
                                        <p className="card-text">Además de nuestras clases regulares, ofrecemos talleres especializados en diferentes áreas de interés. Estos talleres te brindarán la oportunidad de aprender de manera práctica y enfoques más específicos.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-4">
                                <div className="card h-100">
                                    <img src={bibliotecaImage} className="card-img-top" alt="Imagen del servicio" />
                                    <div className="card-body">
                                        <h3 className="card-title fw-bold mb-3">Biblioteca</h3>
                                        <p className="card-text">Nuestra academia cuenta con una biblioteca completa y actualizada con una amplia selección de libros, revistas y recursos digitales. Podrás acceder a ellos para complementar tus estudios y realizar investigaciones.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="nosotros" className="bg-light py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <img src={logo} className="img-fluid rounded mb-3" alt="Imagen de la academia" />
                            </div>
                            <div className="col-lg-6">
                                <h2 className="fw-bold mb-4">Acerca de nosotros</h2>
                                <p className="lead mb-4">Somos una academia comprometida con la educación de calidad y el crecimiento personal de nuestros estudiantes. Contamos con un equipo de profesores apasionados y dedicados que te ayudarán a alcanzar tus metas académicas.</p>
                                <p className="lead mb-4">En nuestra academia, nos enfocamos en brindar una experiencia de aprendizaje enriquecedora y personalizada. Nuestro objetivo es que desarrolles habilidades, conocimientos y valores que te preparen para el éxito en tu carrera y vida.</p>
                                <a href="/" className="btn btn-primary">Conocer más</a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Dashboard;
