import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import './Login.css';
import { Link } from "react-router-dom";

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      access_token
    }
  }
`;

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async () => {
    try {
      const { data } = await login({ variables: { username, password } });
      if (data && data.login && data.login.access_token) {
        const token = data.login.access_token;
        console.log('Token:', token);
        localStorage.setItem('authHeader', `Bearer ${token}`);
        window.location.href = './Dataget';  // Navigate to Whoami page
      } else {
        console.error('Login response does not contain access_token');
        alert('Login failed: Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed: Invalid credentials');
    }
  };

  return (
    <>
      <div className='app'>
        <div className='container'>
          <div className='first_half'>
            <div className='login_section'>
              <h2 className='main_heading'>We are the team lotus</h2>
              <h3 className='sub_heading'>Please Login to your account</h3>
              <input
                type="text"
                placeholder="Username"
                className="input_field"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="input_field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button onClick={handleLogin} className="login_button">LOG IN</button>
              <a href="#!" className="forgot_password">Forgot password?</a>
              <div className="create_account_section">
                <span className='spanelement'>Don't have an account?</span>
                <button className="create_account_button">
                  <Link to="/signup" className="link_text">CREATE NEW</Link>
                </button>
              </div>
            </div>
          </div>
          <div className='second_half'>
            <h4 className='second_section_mainheading'>We are more than just a <br />company</h4>
            <p className='second_section_subheading'>
              Log in to access your account <br />and explore personalized features. <br />Enter your credentials to securely sign in <br />and continue your journey with us.
            </p>
          </div>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </>
  );
}

export default Login;
