import React, { useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { ITarget } from "../types/interfaces";
import { login } from "../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../redux/store";
import { Container } from "reactstrap";
const Login: React.FC<{}> = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const state = useSelector((state: RootStore) => state.auth);
  const err = useSelector((state: RootStore) => state.error);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (state.isAuthenticated) {
      history.push("/");
    }
    if (err.id === "LOGIN_FAIL") {
      setError(err.msg.msg);
    } else {
      setError("");
    }
  }, [state, err]);

  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    const user = { email, password };
    dispatch(login(user));
  };
  const handleChangeEmail = (e: ITarget) => setEmail(e.target.value);
  const handleChangePassword = (e: ITarget) => setPassword(e.target.value);
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleOnSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  onChange={handleChangeEmail}
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  onChange={handleChangePassword}
                />
              </Form.Group>
              <Button variant="secondary" className="w-100" type="submit">
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </Container>
  );
};

export default Login;
