import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
    //   const response = await axios.post('/api/auth/login', {
    //     email,
    //     password
    //   });

    //   const { token } = response.data;
      localStorage.setItem("accessToken", 'true');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <button type="submit">Log in</button>
    </form>
  );
};

export default LoginForm;
