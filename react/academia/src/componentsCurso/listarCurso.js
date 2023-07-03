import React from "react";
import Modal from "react-bootstrap/Modal";
import '../App.css'

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
      errores: {
        nombre: "",
        descripcion: "",
        tiempo: ""
      }
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
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  enviarDatos = (e) => {
    e.preventDefault();
    if (this.validarFormulario()) {
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
  }

  validarFormulario = () => {
    const { nombre, descripcion, tiempo } = this.state;
    let errores = {
      nombre: "",
      descripcion: "",
      tiempo: ""
    };

    let formularioValido = true;

    if (!nombre.trim()) {
      errores.nombre = "El nombre es requerido";
      formularioValido = false;
    }

    if (!descripcion.trim()) {
      errores.descripcion = "La descripción es requerida";
      formularioValido = false;
    }

    if (!tiempo.trim()) {
      errores.tiempo = "El tiempo es requerido";
      formularioValido = false;
    }

    this.setState({ errores });
    return formularioValido;
  };

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
    const { datosCargados, datosCursos, modalOpen, nombre, descripcion, tiempo, id, usuario, modalDetalleOpen, detalleCurso, errores } = this.state;

    return (
      <div className="container-fluid" id="containerListaCurso">
        <Modal show={modalOpen} id='modalEditar'>
          <Modal.Header id='modalEditar'>
            <Modal.Title id='modalEditar'>Editar datos del curso</Modal.Title>
          </Modal.Header>
          <Modal.Body id='modalEditar'>
            <form id="formulario" onSubmit={this.enviarDatos}>
              <div className="mb-3">
                <input type="hidden" id="id" name="id" onChange={this.cambioValor} value={id}></input>
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text" className={`form-control ${errores.nombre ? 'is-invalid' : ''}`} name="nombre" id="nombre" aria-describedby="helpId" placeholder="Nombre del curso" onChange={this.cambioValor} value={nombre}></input>
                {errores.nombre && <small className="text-danger">{errores.nombre}</small>}
                <small id="helpId" className="form-text text-muted">Ingresa el nombre del curso</small>
              </div>
              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">Descripcion</label>
                <input type="text" className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`} name="descripcion" id="descripcion" aria-describedby="helpId" placeholder="Descripcion del curso" onChange={this.cambioValor} value={descripcion}></input>
                {errores.descripcion && <small className="text-danger">{errores.descripcion}</small>}
                <small id="helpId" className="form-text text-muted">Ingresa la Descripcion del curso</small>
              </div>
              <div className="mb-3">
                <label htmlFor="tiempo" className="form-label">Tiempo</label>
                <input type="text" className={`form-control ${errores.tiempo ? 'is-invalid' : ''}`} name="tiempo" id="tiempo" aria-describedby="helpId" placeholder="Tiempo del curso" onChange={this.cambioValor} value={tiempo}></input>
                {errores.tiempo && <small className="text-danger">{errores.tiempo}</small>}
                <small id="helpId" className="form-text text-muted">Ingresa el Tiempo del curso</small>
              </div>
              <div className="mb-3">
                <label htmlFor="usuario" className="form-label">Usuario</label>
                <input type="text" className="form-control" name="usuario" id="usuario" aria-describedby="helpId" placeholder="Usuario" onChange={this.cambioValor} value={usuario}></input>
                <small id="helpId" className="form-text text-muted">Ingresa el usuario</small>
              </div>
              <div className="mb-3">
                <button type="button" className="btn btn-secondary" onClick={() => this.closeModal()}>Cerrar</button>
                {'||'}
                <button type="submit" className="btn btn-success">Actualizar</button>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer id='modalEditar'>
          </Modal.Footer>
        </Modal>

        <Modal show={modalDetalleOpen} onHide={() => this.closeModalDetalle()} id="modalDetalle">
          <Modal.Header closeButton id="modalDetalle">
            <Modal.Title>Detalles del curso</Modal.Title>
          </Modal.Header>
          <Modal.Body id="modalDetalle">
            {detalleCurso && (
              <div>
                <h5>Nombre: {detalleCurso.nombre}</h5>
                <p>Descripción: {detalleCurso.descripcion}</p>
                <p>Tiempo: {detalleCurso.tiempo}</p>
                <p>Usuario: {detalleCurso.usuario}</p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer id="modalDetalle">
            <button className="btn btn-secondary" onClick={() => this.closeModalDetalle()}>
              Cerrar
            </button>
          </Modal.Footer>
        </Modal>

        <h1 id="h1Listar">Lista de cursos</h1>
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
                  <td scope="row" id="tdTabla">{datosExtraidos.id}</td>
                  <td id="tdTabla">{datosExtraidos.nombre}</td>
                  <td id="tdTabla">{datosExtraidos.descripcion}</td>
                  <td id="tdTabla">{datosExtraidos.tiempo}</td>
                  <td id="tdTabla">{datosExtraidos.usuario}</td>
                  <td id="tdTablaAcciones">
                    <a name="" id="botonAcciones" className="btn btn-danger" onClick={() => this.eliminar(datosExtraidos.id)} role="button">Borrar</a>
                    {'||'}
                    <a name="" id="botonAcciones" className="btn btn-primary" onClick={() => this.editar(datosExtraidos)} role="button">Editar</a>
                    {'||'}
                    <a name="" id="botonAcciones" className="btn btn-info" onClick={() => this.openModalDetalle(datosExtraidos)} role="button">Detalle</a>
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