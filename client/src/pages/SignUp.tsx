import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function SignUp() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');

  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
  };

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
    // Add your sign-up logic here
  };

  return (
    <div className="container">
      <h1 className="text-center">Sign Up</h1>
      <br />
      <div className="registration-container">
        <h1 className="text-center">SIGN UP</h1>
        <Form onSubmit={handleSubmit}>
          <p className="text-center">Fill in the information below to sign up:</p>
          <Form.Group controlId="username">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Choose username..."
              value={displayName}
              onChange={handleDisplayNameChange}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter e-mail..."
              value={email}
              onChange={handleEmailChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type={passwordType}
              placeholder="Enter password..."
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
            Sign up
          </Button>
        </Form>
      </div>
      <p className="text-center">
        Already have an account?{' '}
        <a className="resetButton" href="login">
          Log in!
        </a>
      </p>
      <Form>
        <Form.Group controlId="newsletterCheckbox" className="ckeckbox-box">
          <Form.Check
            type="checkbox"
            label={
              <span className="checkbox-label">
                Yes, please send me tasty emails! I'd like to receive news and exclusive offers
                from the Cook`cinelle. By signing up, you agree to our Terms of Use. Learn how we
                collect, use, and share your data in our Privacy Policy.
              </span>
            }
          />
        </Form.Group>
      </Form>
    </div>
  );
}

export default SignUp;