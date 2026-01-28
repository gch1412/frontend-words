import { Container } from "react-bootstrap"
import { Row, Col } from "react-bootstrap"

import WordsOptionCard from "./WordsOptionCard"

const WordsMenu = () => {
  return (
    <Container fluid className="vh-100">
      <div className="d-flex align-items-center h-100">
        <Row className="w-100 h-50 justify-content-center g-4">
          <Col xs={12} sm={6} md={3}>
            <WordsOptionCard link="/words/nouns" from="words" title="Nouns" subtitle="Nomes" />
          </Col>
          <Col xs={12} sm={6} md={3}>
            <WordsOptionCard link="/words/adjectives" from="home" title="Adjectives" subtitle="Adjetivos" />
          </Col>
          <Col xs={12} sm={6} md={3}>
            <WordsOptionCard link="/words/verbs" from="home" title="Verbs" subtitle="Verbos" />
          </Col>
          <Col xs={12} sm={6} md={3}>
            <WordsOptionCard link="/words/grammatical" from="home" title="Grammatical" subtitle="Gramática" />
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default WordsMenu