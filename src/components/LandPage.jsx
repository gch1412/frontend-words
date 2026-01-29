import { Link } from "react-router-dom"
import { Card, Carousel } from "react-bootstrap"
import { Container } from "react-bootstrap"
import { Row } from "react-bootstrap"
import { Col } from "react-bootstrap"
import expanda from "../assets/images/expanda.jpg"
import hello from "../assets/images/hello.jpg"
import profissional from "../assets/images/profissional.jpg"

const LandPage = () => {
  return (
    <>
      <Carousel className="h-50">
        <Carousel.Item>
          <img src={hello} className="d-block w-100" />
          <Carousel.Caption className="top-50 translate-middle-y d-flex flex-column align-items-center">
            <div className="d-flex flex-column align-items-center mb-5">
              <Link to="/login" className="btn btn-primary px-4 py-2 fs-5 mb-5 custom-button" role="button">Entrar</Link>
              <Link to="/signup" className="btn btn-primary px-4 py-2 fs-5 mb-5 custom-button" role="button">Cadastre-se</Link>
            </div>

            <div>
              <h3>Aprenda as palavras básicas do idioma</h3>
              <p>No LangApp, você pode estudar os idiomas mais falados do mundo</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={expanda} className="d-block w-100" />
          <Carousel.Caption className="top-50 translate-middle-y d-flex flex-column align-items-center">
            <div className="d-flex flex-column align-items-center mb-5">
              <Link to="/login" className="btn btn-primary px-4 py-2 fs-5 mb-5 custom-button" role="button">Entrar</Link>
              <Link to="/signup" className="btn btn-primary px-4 py-2 fs-5 mb-5 custom-button" role="button">Cadastre-se</Link>
            </div>

            <div>
              <h3>Expanda seus horizontes</h3>
              <p>Aprender uma nova língua nos apresenta culturas e histórias que nunca imaginaríamos</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={profissional} className="d-block w-100" />
          <Carousel.Caption className="top-50 translate-middle-y d-flex flex-column align-items-center">
            <div className="d-flex flex-column align-items-center mb-5">
              <Link to="/login" className="btn btn-primary px-4 py-2 fs-5 mb-5 custom-button" role="button">Entrar</Link>
              <Link to="/signup" className="btn btn-primary px-4 py-2 fs-5 mb-5 custom-button" role="button">Cadastre-se</Link>
            </div>

            <div>
              <h3>Melhore seu currículo profissional</h3>
              <p>
                Quem consegue se comunicar em mais de um idioma, aumenta suas oportunidades de emprego
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>


      <div className="w-100 py-2" style={{ backgroundColor: "white" }}>
        <section className="mx-auto my-2">

          <h1 className="text-center mb-4">Apps</h1>
          <Container className="min-vh-50" fluid>
            <Row className="g-4">
              <Col sm={12} md={6} lg={4} className="d-flex">
                <Card className="card-public h-100">
                  <Card.Body>
                    <Card.Title>
                      Palavras básicas
                    </Card.Title>
                    <Card.Text>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident fuga suscipit iste adipisci atque dolorem harum! Quos et accusantium tempore laudantium fuga, quidem delectus doloremque deleniti necessitatibus commodi, placeat impedit.
                    </Card.Text>
                  </Card.Body>
                </Card>

              </Col>
              <Col sm={12} md={6} lg={4} className="d-flex">
                <Card className="card-public h-100">
                  <Card.Body>
                    <Card.Title>
                      Palavras personalizadas
                    </Card.Title>
                    <Card.Text>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi aliquid corrupti, quasi cum, non debitis, excepturi impedit beatae quisquam optio velit odit quos officiis expedita incidunt reiciendis reprehenderit necessitatibus culpa?
                    </Card.Text>
                  </Card.Body>
                </Card>

              </Col>
              <Col sm={12} md={6} lg={4} className="d-flex">
                <Card className="card-public h-100">
                  <Card.Body>
                    <Card.Title>
                      Quizzes
                    </Card.Title>
                    <Card.Text>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quod, mollitia accusantium totam illo dignissimos sunt? Excepturi nihil sapiente cumque accusamus consequuntur repellat ipsam debitis sit animi. Vero, dolor pariatur?
                    </Card.Text>
                  </Card.Body>
                </Card>

              </Col>
              <Col sm={12} md={6} lg={4} className="d-flex">
                <Card className="card-public h-100">
                  <Card.Body>
                    <Card.Title>
                      Alfabeto Fonético Internacional
                    </Card.Title>
                    <Card.Text>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, illum facilis? Atque assumenda cum beatae. Dicta laborum officiis quaerat optio impedit, temporibus quasi, possimus recusandae porro eum, quas sunt dignissimos.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={12} md={6} lg={4} className="d-flex">
                <Card className="card-public h-100">
                  <Card.Body>
                    <Card.Title>
                      Explicações gramaticais
                    </Card.Title>
                    <Card.Text>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, illum facilis? Atque assumenda cum beatae. Dicta laborum officiis quaerat optio impedit, temporibus quasi, possimus recusandae porro eum, quas sunt dignissimos.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  )
}

export default LandPage