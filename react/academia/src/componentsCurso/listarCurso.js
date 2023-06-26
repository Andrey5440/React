//Comando imr para importar react
import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";

//Comando ccc para crear el contructor, la clase y el componente
//Hay que poner (React.Component) para que el componente herede todo el react del proyecto
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
            usuario: ""
        };
    }
    cargarDatos() {
        //alert('Cargue datos');
        fetch("https://paginas-web-cr.com/ApiPHP/apis/ListaCurso.php") //url de peticion de datos
            .then((respuesta) => respuesta.json()) //recibe los datos en formato json
            .then((datosrepuesta) => {
                this.setState({ datosCargados: true, datosCursos: datosrepuesta.data });
                console.log(datosrepuesta.data);
            })
            .catch(console.log); //muestra errores
    }
    eliminar(id) {
        var datosenviar = {
            id: id
        }
        fetch("https://paginas-web-cr.com/ApiPHP/apis/BorrarCursos.php",
            {
                method: "POST",
                body: JSON.stringify(datosenviar)
            })
            .then(respuesta => respuesta.json())//recibe los datos en formato json
            .then((datosrepuesta) => {
                window.location = 'ListarCurso';
            })
            .catch(console.log)//muestra errores
        console.log(id);
    }

    editar(objeto) {
        console.log(objeto);
        this.setState({nombre: objeto.nombre, descripcion: objeto.descripcion, tiempo: objeto.tiempo, id: objeto.id, usuario: objeto.usuario });
        this.openModal();

    }
    cambioValor = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({ state });
    }
    enviarDatos = (e) =>{
        e.preventDefault();
        const { id, nombre, descripcion, tiempo, usuario} = this.state;
        var datosenviar = {
            id: id,
            nombre: nombre,
            descripcion: descripcion,
            tiempo: tiempo,
            usuario: usuario

        }
        console.log(datosenviar);
        fetch("https://paginas-web-cr.com/ApiPHP/apis/ActualizarCursos.php",
        {
            method:"POST",
            body:JSON.stringify(datosenviar)
        })//url de peticion de datos
        .then(respuesta => respuesta.json())//recibe los datos en formato json
        .then((datosrepuesta) => {    
            window.location = 'ListarCurso'        
             console.log('Datos',datosrepuesta)//Muestra el resultado de la peticion
        })
        .catch(console.log)//muestra errores
    }
    openModal() {
        this.setState({ modalOpen: true })

    }
    closeModal() {
        this.setState({ modalOpen: false })

    }
    
    componentDidMount() {
        this.cargarDatos();
    }
    render() {
        const { datosCargados, datosCursos, modalOpen, nombre, descripcion, tiempo, id, usuario } = this.state;
        return (
            <div className="container">
                <Button variant="primary" onClick={() => this.openModal()}>
                    Crear curso
                </Button>

                <Modal show={modalOpen}>
                    <Modal.Header>
                        <Modal.Title>Modal Editar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form id="formulario" onSubmit={this.enviarDatos}>
                            <div className="mb-3">
                                <input type="hidden" id="id" name="id" onChange={this.cambioValor} value={id}></input>
                                <label htmlFor="nombre" className="form-label">Nombre</label>
                                <input type="text"
                                    className="form-control" name="nombre" id="nombre" aria-describedby="helpId" placeholder="Nombre del curso" onChange={this.cambioValor} value={nombre}></input>
                                <small id="helpId" className="form-text text-muted">Ingresa el nombre del curso</small>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="descripcion" className="form-label">Descripcion</label>
                                <input type="text"
                                    className="form-control" name="descripcion" id="descripcion" aria-describedby="helpId" placeholder="Descripcion del curso" onChange={this.cambioValor} value={descripcion}></input>
                                <small id="helpId" className="form-text text-muted">Ingresa la Descripcion del curso</small>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tiempo" className="form-label">Tiempo</label>
                                <input type="text"
                                    className="form-control" name="tiempo" id="tiempo" aria-describedby="helpId" placeholder="Tiempo del curso" onChange={this.cambioValor} value={tiempo}></input>
                                <small id="helpId" className="form-text text-muted">Ingresa el Tiempo del curso</small>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="usuario" className="form-label">usuario</label>
                                <input type="text"
                                    className="form-control" name="usuario" id="usuario" aria-describedby="helpId" placeholder="Usuario" onChange={this.cambioValor} value={usuario}></input>
                                <small id="helpId" className="form-text text-muted">Ingresa el usuario</small>
                            </div>
                            <div className="mb-3">
                                <button type="button" className="btn btn-secondary" onClick={() => this.closeModal()}>Close</button>
                                ||
                                <button type="reset" className="btn btn-danger">Reset</button>
                                ||
                                <button type="submit" className="btn btn-primary">Actualizar</button>

                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
                <h1>Listar Curso</h1>
                <div className="table-responsive">
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
                            {
                                datosCursos.map((datosExtraidos) => (
                                    <tr key={datosExtraidos.id} className="table-primary">
                                        <td scope="row">{datosExtraidos.id}</td>
                                        <td>{datosExtraidos.nombre}</td>
                                        <td>{datosExtraidos.descripcion}</td>
                                        <td>{datosExtraidos.tiempo}</td>
                                        <td>{datosExtraidos.usuario}</td>
                                        <td>
                                            <a name="" id="" className="btn btn-danger" onClick={() => this.eliminar(datosExtraidos.id)} role="button"> Borrar</a>
                                            ||
                                            <a name="" id="" className="btn btn-primary" onClick={() => this.editar(datosExtraidos)} role="button">Editar</a>
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
