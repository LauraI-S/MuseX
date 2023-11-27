import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <div className="login-container">
            <h1 className="text-center">LOG IN</h1>
            <Form onSubmit={handleSubmit}>
              <p className="text-center">Enter your credentials below to log in:</p>
              <Form.Group controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your e-mail..."
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type={passwordType}
                  placeholder="Enter your password..."
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <Form.Text
                  className="text-muted"
                  style={{ cursor: 'pointer' }}
                  onClick={togglePasswordVisibility}
                >
                  {passwordType === 'password' ? 'Show' : 'Hide'} password
                </Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit" block>
                Log In
              </Button>
            </Form>
          </div>
          <p className="text-center">
            Don't have an account?{' '}
            <a className="resetButton" href="signup">
              Sign up!
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
