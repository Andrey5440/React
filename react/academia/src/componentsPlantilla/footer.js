import React from "react";

class Footer extends React.Component {
    render() {
      return (
        <footer className="footer" id="footer1">
          <div className="container" id="contFooter">
            <p className="text-center">© {new Date().getFullYear()} Mi Sitio Web. Todos los derechos reservados.</p>
          </div>
        </footer>
      );
    }
  }
  
  export default Footer;
