import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import API from '../api'

  

const Login = () =>{

    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    };

    return (
      <div className='login-container'>
        <h2>Login</h2>
        <form  className="login-form"onSubmit={handleSubmit}>
          <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  


export default Login 