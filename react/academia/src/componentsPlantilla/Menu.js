import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
class MenuPrincipal extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( 
            <Navbar id="menu" expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">Academia</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Inicio</Nav.Link>
                            <NavDropdown title="Administrar Cursos" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/ListarCurso">Lista de cursos</NavDropdown.Item>
                                <NavDropdown.Item href="/CrearCurso">
                                    Crear un curso
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                            </NavDropdown>
                            <NavDropdown title="Administrar Grupos" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/ListarGrupo">Lista de grupos</NavDropdown.Item>
                                <NavDropdown.Item href="/CrearGrupo">
                                    Crear un grupo
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>    
         );
    }
}
 
export default MenuPrincipal;