import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
        } else if (decoded.role === 'admin') {
          navigate('/admin/dashboard', { replace: true });
        }
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Login response:', data);
      console.log('data.token:', data.token);

      if (response.ok && data.token) {
        // ✅ Store token (synchronously, no await)
        localStorage.setItem('token', data.token);
        console.log('Token stored:', localStorage.getItem('token'));

        // ✅ Decode token and navigate
        const decoded = jwtDecode(data.token);
        console.log('Decoded token:', decoded);

        if (decoded.role === 'admin') {
          alert('Login successful');
          console.log('Attempting to navigate to dashboard');
          navigate('/admin/dashboard', { replace: true });
        } else {
          alert('Access denied: Not an admin');
        }
      } else {
        alert(data.error || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-xl shadow w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 w-full rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
