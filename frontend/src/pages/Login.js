import React from 'react'
import { useState } from 'react'
import {toast} from 'react-toastify'

const Login = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const {name, email, password} = formData

  const onChange = function(e) {

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    
  }

  const onSubmit = function(e) {
    e.preventDefault()
  }

  return (
    <>
      <div className='container'>

      <div className='heading'>
        <h1>Please Log In</h1>
        <p>Welcome Back...</p>
      </div>

        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input 
              name='name'
              type='text' 
              id='name' 
              value={''} 
              onChange={onChange}
              placeholder='Name'
              autoComplete='off'
            />
          </div>
          <div className='form-group'>
            <input 
              name='email' 
              type='text'
              id='email' 
              value={''} 
              onChange={onChange}
              placeholder='Email'
              autoComplete='off'
            />
          </div>
          <div className='form-group'>
            <input 
              name='password' 
              type='password'
              id='password' 
              value={''} 
              onChange={onChange}
              placeholder='Password'
            />
          </div>

          <div className='form-group'>
            <button className='btn btn-standard'>
              Login
            </button>
          </div>

        </form>
            
      </div>
    </>
    
  )
}

export default Login