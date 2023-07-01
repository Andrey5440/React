import React from 'react';
import '../styles.css'
class CrearCurso extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      descripcion: "",
      tiempo: "",
      datosCargados: false,
      errores: {
        nombre: "",
        descripcion: "",
        tiempo: ""
      }
    };
  }

  enviarDatos = (e) => {
    e.preventDefault();
    if (this.validarFormulario()) {
      const { nombre, descripcion, tiempo } = this.state;
      var datosenviar = {
        nombre: nombre,
        descripcion: descripcion,
        tiempo: tiempo,
        usuario: 'Andrey Ramirez',
      };

      fetch("https://paginas-web-cr.com/ApiPHP/apis/InsertarCursos.php", {
        method: 'POST',
        body: JSON.stringify(datosenviar)
      })
        .then(respuesta => respuesta.json())
        .then((datosrespuesta) => {
          console.log('Datos', datosrespuesta);
          window.location = 'ListarCurso';
        })
        .catch(console.log);

    }
  };

  cambioValor = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  limpiarCampos = () => {
    this.setState({
      nombre: "",
      descripcion: "",
      tiempo: "",
      errores: {
        nombre: "",
        descripcion: "",
        tiempo: ""
      }
    });
  };

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

  render() {
    const { nombre, descripcion, tiempo, errores } = this.state;
    return (
      <div className='form-control' id='formCon'>
        <form id="formulario" onSubmit={this.enviarDatos}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input type="text" className="form-control" name="nombre" id="nombre" placeholder="Ingresa el nombre del curso" onChange={this.cambioValor} value={nombre} />
            {errores.nombre && <small className="text-danger">{errores.nombre}</small>}
          </div>
          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">Descripcion</label>
            <input type="text" className="form-control" name="descripcion" id="descripcion" placeholder="Ingresa la descripción del curso" onChange={this.cambioValor} value={descripcion} />
            {errores.descripcion && <small className="text-danger">{errores.descripcion}</small>}
          </div>
          <div className="mb-3">
            <label htmlFor="tiempo" className="form-label">Tiempo</label>
            <input type="text" className="form-control" name="tiempo" id="tiempo" placeholder="Ingresa el tiempo del curso" onChange={this.cambioValor} value={tiempo} />
            {errores.tiempo && <small className="text-danger">{errores.tiempo}</small>}
          </div>
          <div className="mb-3">
            <button type="reset" className="btn btn-danger" onClick={this.limpiarCampos}>Limpiar datos digitados</button>
            {'||'}
            <button type="submit" className="btn btn-primary">Crear curso</button>
          </div>
        </form>
      </div>
    );
  }
}

export default CrearCurso;
