import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <p>This is the home page.</p>
      <Link to="/signup">Go to Signup</Link>
    </div>
  );
}

export default Home;
