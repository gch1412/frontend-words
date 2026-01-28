import { useLocation } from "react-router-dom"
import { Container } from "react-bootstrap"
import { faHouse, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

const Header = () => {

    const location = useLocation()
    
    let title
    let subtitle

    switch (location.pathname) {
        case '/home':
            title = 'Free English Course'
            subtitle = 'Curso de inglês grátis'
            break
        case '/words':
            title = 'Word Lists'
            subtitle = 'Listas de palavras'
            break
        case '/add_word':
            title = 'Add New Word'
            subtitle = 'Adicionar nova palavra'
            break
        case '/save':
            title = 'Save'
            subtitle = 'Salvar'
            break
        default:
            title = ''
            subtitle = ''
    }

    return (
    <header className="vh-20 d-flex align-items-center">
      <Container className="d-flex align-items-center justify-content-between">

        <div>
          {location.state?.from && (
            <Link to={`/${location.state.from}`}>
              <FontAwesomeIcon icon={faArrowLeft} className="fs-1 p-1" />
            </Link>
          )}
        </div>

        <div>
          <h1 className="fs-1 mb-0">{title}</h1>
          <p className="fs-6 mt-0 mb-0">{subtitle}</p>
        </div>

        <div>
          {location.pathname !== "/home" && (
            <Link to="/home">
              <FontAwesomeIcon icon={faHouse} className="fs-1 p-1" />
            </Link>
          )}
        </div>

      </Container>
    </header>
  )
}

export default Header