import React from "react";
import Modal from "react-bootstrap/Modal";
import '../App.css'

class ListarGrupo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datosCargados: false,
      datosGrupos: [],
      modalOpen: false,
      nombre: "",
      id: "",
      modalDetalleOpen: false,
      detalleGrupo: null,
      errors: {} // Estado para almacenar los errores de validación
    };
  }

  cargarDatos() {
    fetch("https://paginas-web-cr.com/ApiPHP/apis/ListaGrupo.php")
      .then((respuesta) => respuesta.json())
      .then((datosrepuesta) => {
        this.setState({
          datosCargados: true,
          datosGrupos: datosrepuesta.data,
        });
        console.log(datosrepuesta.data);
      })
      .catch(console.log);
  }

  eliminar(id) {
    var datosenviar = {
      id: id,
    };
    fetch("https://paginas-web-cr.com/ApiPHP/apis/BorrarGrupo.php", {
      method: "POST",
      body: JSON.stringify(datosenviar),
    })
      .then((respuesta) => respuesta.json())
      .then((datosrepuesta) => {
        window.location = "ListarGrupo";
      })
      .catch(console.log);
    console.log(id);
  }

  editar(objeto) {
    console.log(objeto);
    this.setState({ id: objeto.id, nombre: objeto.nombre });
    this.openModal();
  }

  cambioValor = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // Función para validar los campos antes de enviar los datos
  validarCampos() {
    const { nombre } = this.state;
    let errors = {};

    // Validación del campo nombre
    if (!nombre.trim()) {
      errors.nombre = "El nombre del grupo es obligatorio";
    }

    return errors;
  }

  enviarDatos = (e) => {
    e.preventDefault();
    const { id, nombre } = this.state;

    // Validación de campos
    const errors = this.validarCampos();

    if (Object.keys(errors).length === 0) {
      var datosenviar = {
        id: id,
        nombre: nombre,
      };

      fetch("https://paginas-web-cr.com/ApiPHP/apis/ActualizarGrupo.php", {
        method: "POST",
        body: JSON.stringify(datosenviar),
      })
        .then((respuesta) => respuesta.json())
        .then((datosrepuesta) => {
          window.location = "ListarGrupo";
          console.log("Datos", datosrepuesta);
        })
        .catch(console.log);
    } else {
      // Mostrar los errores de validación
      this.setState({ errors });
    }
  };

  openModal() {
    this.setState({ modalOpen: true });
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  openModalDetalle(grupo) {
    this.setState({ modalDetalleOpen: true, detalleGrupo: grupo });
  }

  closeModalDetalle() {
    this.setState({ modalDetalleOpen: false, detalleGrupo: null });
  }

  componentDidMount() {
    this.cargarDatos();
  }

  render() {
    const {
      datosCargados,
      datosGrupos,
      modalOpen,
      nombre,
      id,
      modalDetalleOpen,
      detalleGrupo,
      errors
    } = this.state;

    return (
      <div className="container-fluid" id="containerListaGrupo">
        <Modal show={modalOpen} id='modalEditar'>
          <Modal.Header id='modalEditar'>
            <Modal.Title id='modalEditar'>Editar datos del grupo</Modal.Title>
          </Modal.Header>
          <Modal.Body id='modalEditar'>
            <form id="formulario" onSubmit={this.enviarDatos}>
              <div className="mb-3">
                <input
                  type="hidden"
                  id="id"
                  name="id"
                  onChange={this.cambioValor}
                  value={id}
                />
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.nombre && 'is-invalid'}`}
                  name="nombre"
                  id="nombre"
                  aria-describedby="helpId"
                  placeholder="Nombre del grupo"
                  onChange={this.cambioValor}
                  value={nombre}
                />
                {errors.nombre && (
                  <div className="invalid-feedback">{errors.nombre}</div>
                )}
                <small id="helpId" className="form-text text-muted">
                  Ingresa el nombre del grupo
                </small>
              </div>
              <div className="mb-3">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => this.closeModal()}
                >
                  Cerrar
                </button>
                ||
                <button type="submit" className="btn btn-success">
                  Actualizar
                </button>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer id='modalEditar'></Modal.Footer>
        </Modal>

        <Modal show={modalDetalleOpen} id="modalDetalle">
          <Modal.Header id="modalDetalle">
            <Modal.Title>Detalle de Grupo</Modal.Title>
          </Modal.Header>
          <Modal.Body id="modalDetalle">
            {detalleGrupo && (
              <div>
                <p>ID: {detalleGrupo.id}</p>
                <p>Nombre: {detalleGrupo.nombre}</p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer id="modalDetalle">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => this.closeModalDetalle()}
            >
              Cerrar
            </button>
          </Modal.Footer>
        </Modal>

        <h1 id="h1Listar">Lista de grupos</h1>
        <div className="table-responsive" id="tabla">
          <table className="table table-primary">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Nombre</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {datosGrupos.map((datosExtraidos) => (
                <tr key={datosExtraidos.id} className="table-primary">
                  <td scope="row" id="tdTabla">{datosExtraidos.id}</td>
                  <td id="tdTabla">{datosExtraidos.nombre}</td>
                  <td id="tdTablaAcciones" style={{ whiteSpace: 'nowrap' }}>
                    <button id="botonAcciones"
                      className="btn btn-danger" 
                      onClick={() => this.eliminar(datosExtraidos.id)}
                    >
                      Borrar
                    </button>{" "}
                    ||
                    <button id="botonAcciones"
                      className="btn btn-primary"
                      onClick={() => this.editar(datosExtraidos)}
                    >
                      Editar
                    </button>{" "}
                    ||
                    <button id="botonAcciones"
                      className="btn btn-info"
                      onClick={() => this.openModalDetalle(datosExtraidos)}
                    >
                      Detalle
                    </button>
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

export default ListarGrupo;
