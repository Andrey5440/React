import React from 'react';

class CrearGrupo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      datosCargados: false,
      errores: {
        nombre: ""
      }
    };
  }

  enviarDatos = (e) => {
    e.preventDefault();
    if (this.validarFormulario()) {
      const { nombre } = this.state;
      var datosenviar = {
        nombre: nombre
      };

      fetch("https://paginas-web-cr.com/ApiPHP/apis/InsertarGrupo.php", {
        method: 'POST',
        body: JSON.stringify(datosenviar)
      })
        .then(respuesta => respuesta.json())
        .then((datosrespuesta) => {
          console.log('Datos', datosrespuesta);
          window.location = 'ListarGrupo';
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
      errores: {
        nombre: ""
      }
    });
  };

  validarFormulario = () => {
    const { nombre } = this.state;
    let errores = {
      nombre: ""
    };

    let formularioValido = true;

    if (!nombre.trim()) {
      errores.nombre = "El nombre es requerido";
      formularioValido = false;
    }

    this.setState({ errores });
    return formularioValido;
  };

  render() {
    const { nombre, errores } = this.state;
    return (
      <div className='form-control'>
        <form id="formulario" onSubmit={this.enviarDatos}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input type="text" className="form-control" name="nombre" id="nombre" placeholder="Ingresa el nombre del grupo" onChange={this.cambioValor} value={nombre} />
            {errores.nombre && <small className="text-danger">{errores.nombre}</small>}
          </div>
          <div className="mb-3">
            <button type="reset" className="btn btn-danger" onClick={this.limpiarCampos}>Limpiar datos digitados</button>
            {'||'}
            <button type="submit" className="btn btn-primary">Crear grupo</button>
          </div>
        </form>
      </div>
    );
  }
}

export default CrearGrupo;

