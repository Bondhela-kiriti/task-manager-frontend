
import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import API from '../api'

const Register = () => {

    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const res = await API.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    };

    return (
      <div className="register-container">
        <h2>Register</h2>
        <form className='register-form' onSubmit={handleSubmit}>
          <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }


  



export default Register