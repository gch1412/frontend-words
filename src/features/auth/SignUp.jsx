import { Container } from "react-bootstrap"
import { Form } from "react-bootstrap"
import { useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import { useCreateUserMutation } from "../users/usersApiSlice"
import { useNavigate, useLocation } from "react-router-dom"

const SignUp = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [createUser, { isSuccess, isLoading, isError, error }] = useCreateUserMutation()

  useEffect(() => {
    if (isSuccess) navigate({pathname: '/home', replace: true})
  }, [isSuccess, navigate])

  const canSave = [username, password].every(Boolean)

  const handleSaveUser = async (e) => {
    e.preventDefault()

    if (canSave) {
      await createUser({ username, password }).unwrap()
    }
  }

  return (
    <Container fluid>
      {isError ? <p>{error}</p> : ""}

      <Form className="min-vh-100 w-100 d-flex flex-column align-items-center justify-content-center" style={{ boxShadow: "0px 0px 0px transparent" }}>

        <Form.Group className="w-75 d-flex flex-column my-3">
          <Form.Label className="fs-3">
            Username
          </Form.Label>
          <Form.Control
            type="text"
            className="w-100 border-2 border-black fs-4"
            placeholder="Enter the username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="w-75 d-flex flex-column my-3">
          <Form.Label className="fs-3">
            Password
          </Form.Label>
          <Form.Control
            className="w-100 border-2 border-black fs-4"
            type="password"
            placeholder="Enter the password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button className="w-75 fs-4 p-2" onClick={handleSaveUser} disabled={!canSave}>
          {isLoading ? <p>Loading...</p> : <p>Sign up</p>}
        </Button>
      </Form>
    </Container>
  )
}

export default SignUp