
import ListarCurso from './componentsCurso/listarCurso';
import MenuPrincipal from './componentsPlantilla/Menu';
import Dashboard from './componentsPlantilla/Dashboard';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import{ Route, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    //Cuando escribimos html en react ya no es (class), si no que es (className)"
      <div className='App'>
        <MenuPrincipal></MenuPrincipal>
        <Router>
          <Route exact path="/" component={Dashboard}></Route>
          <Route path="/ListarCurso" component={ListarCurso}></Route>
        </Router>
      </div>
  );
}

export default App;
