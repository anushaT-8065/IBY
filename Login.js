import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true); // Start loading
    try {
      setErrorMessage('');

      // Make API request
      const response = await axios.post('http://localhost:5001/auth/login', {
        username,
        password,
      });

      // Store the token and redirect
      localStorage.setItem('token', response.data.token);
      router.push('/chat');
    } catch (error) {
      // Set error message from server response or default message
      setErrorMessage(error.response?.data?.message || 'Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back!</h2>
        <p className="login-subtitle">Please login to your account</p>

        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin} disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        {errorMessage && <p className="login-error">{errorMessage}</p>}
      </div>
    </div>
  );
}
