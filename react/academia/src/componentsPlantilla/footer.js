import React from "react";
import '../App.css'
class Footer extends React.Component {
    render() {
      return (
        <footer className="footer" id="footer1">
          <div className="container" id="contFooter">
            <p className="text-center">© {new Date().getFullYear()} Academia. Todos los derechos reservados.</p>
          </div>
        </footer>
      );
    }
  }
  
  export default Footer;
