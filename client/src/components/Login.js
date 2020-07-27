import React, { useState } from "react"
import { axiosWithAuth } from './axiosWithAuth'

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [cred, setCred] = useState({})

  const login = e => {
    e.preventDefault()
    axiosWithAuth()
      .post('/login', cred)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        props.history.push('/bubbles')
      })
      .catch(err => console.log('Error logging in: ', err))
  }

  const handleChange = e => {
    setCred({ ...cred, [e.target.name]: e.target.value })
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login}>
        <input type="text" name="username" placeholder="Username" value={cred.username} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={cred.password} onChange={handleChange} />
        <input type="submit" value="Log In" />
      </form>
    </>
  )
}

export default Login
