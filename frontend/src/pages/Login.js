import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { login, reset } from '../features/auth/authSlice'
import Loading from '../components/Loading'
import {toast} from 'react-toastify'

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isSuccess, isError, isLoading, message} = useSelector(state => state.auth)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const {email, password} = formData

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  })

  const onChange = function(e) {

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    
  }

  const onSubmit = function(e) {
    e.preventDefault()

    const userData = {
      email,
      password
    }
    dispatch(login(userData))    
  }

  if (isLoading) {
    return <Loading />
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
              name='email' 
              type='text'
              id='email' 
              value={email} 
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
              value={password} 
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