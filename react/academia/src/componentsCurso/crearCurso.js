import React from 'react';
class CrearCurso extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            nombre: "",
            descripcion:"",
            tiempo:"",
            datosCargados:false,
         }
    }
    enviarDatos = (e) =>{
        e.preventDefault();
        const { nombre, descripcion, tiempo} = this.state;
        var datosenviar = {
            nombre: nombre,
            descripcion: descripcion,
            tiempo: tiempo,
            usuario: 'Andrey Ramirez'

        }
        fetch("https://paginas-web-cr.com/ApiPHP/apis/InsertarCursos.php",
        {
            method: 'POST',
            body:JSON.stringify(datosenviar)
        }
        ) 
        .then(respuesta => respuesta.json())//recibe los datos en json
        .then((datosrespuesta) => {
            console.log('Datos', datosrespuesta)
            window.location = 'ListarCurso'
        } )
        .catch(console.log)

    }
    cambioValor = (e) =>{
        const state = this.state;
        state [e.target.name] = e.target.value;
        this.setState ({state});
    }
    
    render() { 
        const { nombre, descripcion, tiempo, datosCargados } = this.state;
        return ( 
            <div className='form-control'>
                <form id="formulario" onSubmit={this.enviarDatos}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input type="text"
                className="form-control" name="nombre" id="nombre"  placeholder="Ingresa el nombre del curso" onChange={this.cambioValor} value={nombre}></input>
              <small id="helpId" className="form-text text-muted">Ingrese el nombre del curso</small>
            </div>
            <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">Descripcion</label>
                <input type="text"
                  className="form-control" name="descripcion" id="descripcion"  placeholder="Ingresa la descripcion del curso" onChange={this.cambioValor} value={descripcion}></input>
                <small id="helpId" className="form-text text-muted">Ingrese la descripcion del curso</small>
              </div>
              <div className="mb-3">
                <label htmlFor="tiempo" className="form-label">Tiempo</label>
                <input type="text"
                  className="form-control" name="tiempo" id="tiempo"  placeholder="Ingresa el tiempo del curso" onChange={this.cambioValor} value={tiempo}></input>
                <small id="helpId" className="form-text text-muted">Ingrese el tiempo del curso</small>
              </div>
              <div className="mb-3">
                <button type="reset" className="btn btn-danger">Limpiar</button>
                <button type="submit" className="btn btn-primary">Crear curso</button>
              </div>
        </form>
            </div>
         );
    }
}
 
export default CrearCurso;