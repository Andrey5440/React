//Comando imr para importar react
import React from "react";

//Comando ccc para crear el contructor, la clase y el componente
//Hay que poner (React.Component) para que el componente herede todo el react del proyecto
class ListarCurso extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosCargados: false,
            datosCursos: [],
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
    eliminar(id){
        console.log(id);
    }
    editar(objeto){
        console.log(objeto);
    }
    componentDidMount() {
        this.cargarDatos();
    }
    render() {
        const { datosCargados, datosCursos } = this.state;
        return (
            <div className="container">
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
                                            <a name="" id="" className="btn btn-danger" onClick={()=>this.eliminar(datosExtraidos.id)} role="button"> Borrar</a>
                                            ||
                                            <a name="" id="" className="btn btn-primary" onClick={()=>this.editar(datosExtraidos)} role="button">Editar</a>
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
