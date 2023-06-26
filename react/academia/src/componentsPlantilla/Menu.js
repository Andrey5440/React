import React from 'react';
class MenuPrincipal extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( 
            <div>
            <ul className="nav nav-tabs" id="navId" role="tablist">
                <li className="nav-item">
                    <a href="/" className="nav-link" data-bs-toggle="tab" aria-current="page">Home page</a>
                </li>
                <li className="nav-item">
                    <a href="/ListarCurso" className="nav-link" data-bs-toggle="tab" aria-current="page">Cursos</a>
                </li>
            </ul>
            </div>    
         );
    }
}
 
export default MenuPrincipal;