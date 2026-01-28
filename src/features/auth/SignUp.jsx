import { Container } from "react-bootstrap"
import { Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import {Button} from "react-bootstrap"

const SignUp = () => {
  return (
    <Container fluid>
      <Form className="min-vh-100 w-100 d-flex flex-column align-items-center justify-content-center" style={{boxShadow: "0px 0px 0px transparent"}}>

        <Form.Group className="w-75 d-flex flex-column my-3">
          <Form.Label htmlFor="wordInput" className="fs-3">
            Username
          </Form.Label>
          <Form.Control
            id="wordInput"
            type="text"
            className="w-100 border-2 border-black fs-4"
            placeholder="Enter the username..."
          />
        </Form.Group>

        <Form.Group className="w-75 d-flex flex-column my-3">
          <Form.Label htmlFor="wordInput" className="fs-3">
            Password
          </Form.Label>
          <Form.Control
            id="wordInput"
            className="w-100 border-2 border-black fs-4"
            type="password"
            placeholder="Enter the password..."
          />
        </Form.Group>

        <Button className="w-75 fs-4 p-2">
          Sign up
        </Button>
      </Form>
    </Container>
  )
}

export default SignUp