import React from 'react';
import logo from '../logo.svg';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container-fluid" id='containerDashboard'>
                <h1>Panel de Control de la Academia</h1>
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Cursos</h5>
                                <p className="card-text">Administra tus cursos</p>
                                <a href="/ListarCurso" className="btn btn-primary">Ver Cursos</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Grupos</h5>
                                <p className="card-text">Visualiza y administra la información de los grupos.</p>
                                <a href="#" className="btn btn-primary">Ver Grupos</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Profesores</h5>
                                <p className="card-text">Administra el personal docente.</p>
                                <a href="#" className="btn btn-primary">Ver Profesores</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Informes</h5>
                                <p className="card-text">Genera y analiza informes académicos.</p>
                                <a href="#" className="btn btn-primary">Ver Informes</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Eventos</h5>
                                <p className="card-text">Administra los eventos y actividades próximos.</p>
                                <a href="#" className="btn btn-primary">Ver Eventos</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Notificaciones</h5>
                                <p className="card-text">Envía notificaciones importantes a estudiantes y profesores.</p>
                                <a href="#" className="btn btn-primary">Ver Notificaciones</a>
                            </div>
                        </div>
                    </div>
                </div>
                <img src={logo} className="App-logo" alt="logo" />
            </div>
        );
    }
}

export default Dashboard;