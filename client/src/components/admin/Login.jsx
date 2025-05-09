import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Fake user credentials
  const fakeUser = {
    email: 'admin@example.com',
    password: 'admin123'
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the entered credentials match the fake user credentials
    if (email === fakeUser.email && password === fakeUser.password) {
      alert('Login successful');
      navigate('/admin/dashboard');  // Redirect to the dashboard on success
    } else {
      alert('Invalid credentials');  // Show error if credentials don't match
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
          onChange={e => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full mb-4 p-2 border rounded" 
          onChange={e => setPassword(e.target.value)} 
        />
        <button 
          type="submit" 
          className="bg-blue-600 text-white p-2 w-full rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
