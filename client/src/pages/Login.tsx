import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

type LoginCredentialsType= {
  // userName: string;
    email: string;
    password: string;

}
function Login() {
  const [email, setEmail] = useState(''); // setting the state for my eamils looking for changes
  const [password, setPassword] = useState(''); // state for my password
  const [passwordType, setPasswordType] = useState('password'); // setting the state for hiding/showing my password--> it is set to hide the password
//creating a function that´s being trigered in case the sth changes within the emails and also saves the state of that email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
// similar to the emailchange before only for pw
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
// function, that is being called if you click on the text below pw-field
  const togglePasswordVisibility = () => {
    setPasswordType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };
// this function is being called in case the formular is being sent 
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
