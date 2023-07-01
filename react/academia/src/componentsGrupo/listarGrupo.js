import React from "react";
import Modal from "react-bootstrap/Modal";
import '../styles.css';

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

  enviarDatos = (e) => {
    e.preventDefault();
    const { id, nombre } = this.state;
    var datosenviar = {
      id: id,
      nombre: nombre,
    };
    console.log(datosenviar);
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
    } = this.state;

    return (
      <div className="container" id="containerListaGrupo">
        <Modal show={modalOpen}>
          <Modal.Header>
            <Modal.Title>Modal Editar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                  className="form-control"
                  name="nombre"
                  id="nombre"
                  aria-describedby="helpId"
                  placeholder="Nombre del grupo"
                  onChange={this.cambioValor}
                  value={nombre}
                />
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
                <button type="submit" className="btn btn-primary">
                  Actualizar
                </button>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>

        <Modal show={modalDetalleOpen}>
          <Modal.Header>
            <Modal.Title>Detalle de Grupo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {detalleGrupo && (
              <div>
                <p>ID: {detalleGrupo.id}</p>
                <p>Nombre: {detalleGrupo.nombre}</p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => this.closeModalDetalle()}
            >
              Cerrar
            </button>
          </Modal.Footer>
        </Modal>

        <h1>Lista de grupos</h1>
        <div className="table-responsive">
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
                  <td scope="row">{datosExtraidos.id}</td>
                  <td>{datosExtraidos.nombre}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.eliminar(datosExtraidos.id)}
                    >
                      Borrar
                    </button>{" "}
                    ||
                    <button
                      className="btn btn-primary"
                      onClick={() => this.editar(datosExtraidos)}
                    >
                      Editar
                    </button>{" "}
                    ||
                    <button
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
