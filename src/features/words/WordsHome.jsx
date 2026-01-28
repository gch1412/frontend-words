import { Container } from "react-bootstrap"
import { Row, Col } from "react-bootstrap"

import WordsOptionCard from "./WordsOptionCard"

const WordsHome = () => {
  return (
    <Container fluid className="vh-100">
      <div className="d-flex align-items-center h-100">
        <Row className="w-100 h-50 justify-content-center g-4">
          <Col xs={12} sm={6} md={3}>
            <WordsOptionCard link="/words" from="home" title="Words" subtitle="Palavras" />
          </Col>
          <Col xs={12} sm={6} md={3}>
            <WordsOptionCard link="/add_word" from="home" title="Add Word" subtitle="Adicionar Palavra" />
          </Col>
          <Col xs={12} sm={6} md={3}>
            <WordsOptionCard link="/about" from="home" title="About" subtitle="Sobre" />
          </Col>
          <Col xs={12} sm={6} md={3}>
            <WordsOptionCard link="/settings" from="home" title="Settings" subtitle="Configurações" />
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default WordsHome