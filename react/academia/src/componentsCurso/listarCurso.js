import React from "react";
import Modal from "react-bootstrap/Modal";
import '../styles.css'

class ListarCurso extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosCargados: false,
            datosCursos: [],
            modalOpen: false,
            nombre: "",
            descripcion: "",
            tiempo: "",
            id: "",
            usuario: "",
            modalDetalleOpen: false,
            detalleCurso: null,
        };
    }

    cargarDatos() {
        fetch("https://paginas-web-cr.com/ApiPHP/apis/ListaCurso.php")
            .then((respuesta) => respuesta.json())
            .then((datosrepuesta) => {
                this.setState({ datosCargados: true, datosCursos: datosrepuesta.data });
                console.log(datosrepuesta.data);
            })
            .catch(console.log);
    }

    eliminar(id) {
        var datosenviar = {
            id: id
        }
        fetch("https://paginas-web-cr.com/ApiPHP/apis/BorrarCursos.php", {
            method: "POST",
            body: JSON.stringify(datosenviar)
        })
            .then(respuesta => respuesta.json())
            .then((datosrepuesta) => {
                window.location = 'ListarCurso';
            })
            .catch(console.log)
        console.log(id);
    }

    editar(objeto) {
        console.log(objeto);
        this.setState({
            nombre: objeto.nombre,
            descripcion: objeto.descripcion,
            tiempo: objeto.tiempo,
            id: objeto.id,
            usuario: objeto.usuario
        });
        this.openModal();
    }

    cambioValor = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({ state });
    }

    enviarDatos = (e) => {
        e.preventDefault();
        const { id, nombre, descripcion, tiempo, usuario } = this.state;
        var datosenviar = {
            id: id,
            nombre: nombre,
            descripcion: descripcion,
            tiempo: tiempo,
            usuario: usuario
        }
        console.log(datosenviar);
        fetch("https://paginas-web-cr.com/ApiPHP/apis/ActualizarCursos.php", {
            method: "POST",
            body: JSON.stringify(datosenviar)
        })
            .then(respuesta => respuesta.json())
            .then((datosrepuesta) => {
                window.location = 'ListarCurso'
                console.log('Datos', datosrepuesta)
            })
            .catch(console.log)
    }

    openModal() {
        this.setState({ modalOpen: true })
    }

    closeModal() {
        this.setState({ modalOpen: false })
    }

    openModalDetalle(curso) {
        this.setState({ modalDetalleOpen: true, detalleCurso: curso });
    }

    closeModalDetalle() {
        this.setState({ modalDetalleOpen: false, detalleCurso: null });
    }

    componentDidMount() {
        this.cargarDatos();
    }

    render() {
        const { datosCargados, datosCursos, modalOpen, nombre, descripcion, tiempo, id, usuario, modalDetalleOpen, detalleCurso } = this.state;

        return (
            <div className="container">
                <Modal show={modalOpen}>
                    <Modal.Header>
                        <Modal.Title>Modal Editar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form id="formulario" onSubmit={this.enviarDatos}>
                            <div className="mb-3">
                                <input type="hidden" id="id" name="id" onChange={this.cambioValor} value={id}></input>
                                <label htmlFor="nombre" className="form-label">Nombre</label>
                                <input type="text" className="form-control" name="nombre" id="nombre" aria-describedby="helpId" placeholder="Nombre del curso" onChange={this.cambioValor} value={nombre}></input>
                                <small id="helpId" className="form-text text-muted">Ingresa el nombre del curso</small>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="descripcion" className="form-label">Descripcion</label>
                                <input type="text" className="form-control" name="descripcion" id="descripcion" aria-describedby="helpId" placeholder="Descripcion del curso" onChange={this.cambioValor} value={descripcion}></input>
                                <small id="helpId" className="form-text text-muted">Ingresa la Descripcion del curso</small>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tiempo" className="form-label">Tiempo</label>
                                <input type="text" className="form-control" name="tiempo" id="tiempo" aria-describedby="helpId" placeholder="Tiempo del curso" onChange={this.cambioValor} value={tiempo}></input>
                                <small id="helpId" className="form-text text-muted">Ingresa el Tiempo del curso</small>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="usuario" className="form-label">Usuario</label>
                                <input type="text" className="form-control" name="usuario" id="usuario" aria-describedby="helpId" placeholder="Usuario" onChange={this.cambioValor} value={usuario}></input>
                                <small id="helpId" className="form-text text-muted">Ingresa el usuario</small>
                            </div>
                            <div className="mb-3">
                                <button type="button" className="btn btn-secondary" onClick={() => this.closeModal()}>Cerrar</button>
                                ||
                                <button type="submit" className="btn btn-primary">Actualizar</button>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>

                <Modal show={modalDetalleOpen} onHide={() => this.closeModalDetalle()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Detalles del curso</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {detalleCurso && (
                            <div>
                                <h5>Nombre: {detalleCurso.nombre}</h5>
                                <p>Descripción: {detalleCurso.descripcion}</p>
                                <p>Tiempo: {detalleCurso.tiempo}</p>
                                <p>Usuario: {detalleCurso.usuario}</p>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={() => this.closeModalDetalle()}>
                            Cerrar
                        </button>
                    </Modal.Footer>
                </Modal>

                <h1>Listar de cursos</h1>
                <div className="table-responsive" id="tabla">
                    <table className="table table-primary">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Descripcion</th>
                                <th scope="col">Tiempo</th>
                                <th scope="col">Usuario</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datosCursos.map((datosExtraidos) => (
                                <tr key={datosExtraidos.id} className="table-primary">
                                    <td scope="row">{datosExtraidos.id}</td>
                                    <td>{datosExtraidos.nombre}</td>
                                    <td>{datosExtraidos.descripcion}</td>
                                    <td>{datosExtraidos.tiempo}</td>
                                    <td>{datosExtraidos.usuario}</td>
                                    <td>
                                        <a name="" id="btnEliminar" className="btn btn-danger" onClick={() => this.eliminar(datosExtraidos.id)} role="button">Borrar</a>
                                        ||
                                        <a name="" id="btnEditar" className="btn btn-primary" onClick={() => this.editar(datosExtraidos)} role="button">Editar</a>
                                        ||
                                        <a name="" id="btnDetalle" className="btn btn-secondary" onClick={() => this.openModalDetalle(datosExtraidos)} role="button">Detalle</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListarCurso;
