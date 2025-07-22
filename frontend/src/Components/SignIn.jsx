import { useState } from "react"
import { API } from "../utils";
import { useNavigate } from "react-router";

function SignIn({ setToken }) {
  const [formData, setFormData] = useState({email: '', password: ''});
  const navigate = useNavigate()
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    console.log(name, value)
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(API + 'users/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      if(data.token) {
        setToken(data.token);
        localStorage.setItem('token', data.token);

        navigate('/')
      } else {
        alert(data.message || 'login failed')
      }
    })
    .catch(error => console.error('failed to login', error))
  }

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} action="">
        <input
          onChange={handleInputChange} 
          name="email" type="text"
          value={formData.email} 
          placeholder="email"/>
        <input
          type="password" name="password"
          onChange={handleInputChange}
          value={formData.password}
          placeholder="password"/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SignIn