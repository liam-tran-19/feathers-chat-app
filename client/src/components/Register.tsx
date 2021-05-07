import React, { useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { RootStore } from "../redux/store";
import { ITarget } from "../types/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/authActions";
import { Container } from "reactstrap";

const Register: React.FC<{}> = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let _id: number;

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    } else {
      await fetch("/api/auth/user/findAll")
        .then((response) => response.json())
        .then((data) => {
          _id = data.length + 1;
          console.log(_id);
          const user = {
            _id,
            username,
            email,
            password,
          };
          dispatch(register(user));
        });
    }
  };
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  required
                  onChange={(e: ITarget) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  onChange={(e: ITarget) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  onChange={(e: ITarget) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  required
                  onChange={(e: ITarget) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="secondary" className="w-100" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </Container>
  );
};

export default Register;
