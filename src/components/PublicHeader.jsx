import { Navbar } from "react-bootstrap"
import { Nav } from "react-bootstrap"
import { Container } from "react-bootstrap"
import { useLocation } from "react-router-dom"

const PublicHeader = () => {
  const location = useLocation()

  return (
    <Navbar expand="sm" className="w-100 vh-10 d-flex justify-content-around">
    <Navbar.Brand href="#" className='mx-3 fs-1'>LangApp</Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      {
        (location.pathname === '/') && <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto g-4">
            <Nav.Link href="#cursos">Cursos</Nav.Link>
            <Nav.Link href='#faq'>FAQ</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      }
      {
        (location.pathname === '/login') && <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#signup">Não possui conta? Cadastre-se</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      }
      {
        (location.pathname === '/signup') && <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#login">Já possui cadastro?</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      }

    </Navbar>
  )
}

export default PublicHeader