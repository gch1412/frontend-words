import { Button, Container } from "react-bootstrap"
import { Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useLoginMutation } from "./authApiSlice"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCredentials } from "./authSlice"
import usePersist from "../../hooks/usePersist"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [persist, setPersist] = usePersist()

  const [login, { isLoading }] = useLoginMutation()

  const handleLogin = async (e) => {
    e.preventDefault()

    try{
      const accessToken = await login({username, password}).unwrap()

      dispatch(setCredentials({accessToken}))
      setUsername("")
      setPassword("")
      navigate('/home')
    } catch(err){
      console.log(err)
    }
  }

  return (
    <Container fluid>
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

        <Form.Group className="w-75 mb-5 my-3 fs-6 mb-4 d-flex justify-content-between">
          <Form.Check type="checkbox" label="Remember me" checked={persist} onChange={()=>setPersist(prev => !prev)}/>
          <Link to={'/signup'}>Forgot your password?</Link>

        </Form.Group>

        <Button className="w-75 fs-4 p-2" onClick={(e) => handleLogin(e)}>
          Login
        </Button>
      </Form>
    </Container>
  )
}

export default Login