//Comando imr para importar react
import React from 'react';

//Comando ccc para crear el contructor, la clase y el componente 
//Hay que poner (React.Component) para que el componente herede todo el react del proyecto
class ListarCurso extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosCargados: false,
            datosCursos: [],
        }
    }
    render() { 
        const { datosCargados, datosCursos} = this.state
        return (
            <div className='container'>
                <h1>Listar Curso</h1>
                 <div className="table-responsive">
                    <table className="table table-primary">
                        <thead>
                            <tr>
                                <th scope="col">Column 1</th>
                                <th scope="col">Column 2</th>
                                <th scope="col">Column 3</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="">
                                <td scope="row">R1C1</td>
                                <td>R1C2</td>
                                <td>R1C3</td>
                            </tr>
                            <tr className="">
                                <td scope="row">Item</td>
                                <td>Item</td>
                                <td>Item</td>
                            </tr>
                        </tbody>
                    </table>
                 </div>
                 
            </div>
        );
    }
}
 
export default ListarCurso;