
//Comando imr para importar react
import React from 'react';

import logo from '../logo.svg';

//Comando ccc para crear el contructor, la clase y el componente 
//Hay que poner (React.Component) para que el componente herede todo el react del proyecto
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return (
            <div className='container'>
                <h1>Dashboard</h1>
                <img src={logo} className="App-logo" alt='logo'></img>
            </div>
        );
    }
}
 
export default Dashboard;