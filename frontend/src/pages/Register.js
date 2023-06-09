import React from 'react'
import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { register, reset } from '../features/auth/authSlice'
import Loading from '../components/Loading'
import {toast} from 'react-toastify'

const Register = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const {name, email, password, password2} = formData

  useEffect(() => {
    if (isError){
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])

  const onChange = function(e) {

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    
  }

  const onSubmit = function(e) {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match.')
    } else {
      const userData = {
        name,
        email,
        password
      }
      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <div className='container'>

      <div className='heading'>
        <h1>Please Register</h1>
        <p>Welcome...</p>
      </div>

        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input 
              name='name'
              type='text' 
              id='name' 
              value={name} 
              onChange={onChange}
              placeholder='Name'
              autoComplete='off'
              required
            />
          </div>
          <div className='form-group'>
            <input 
              name='email' 
              type='text'
              id='email' 
              value={email} 
              onChange={onChange}
              placeholder='Email'
              autoComplete='off'
              required
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
              required
            />
          </div>
          <div className='form-group'>
            <input 
              name='password2' 
              type='password'
              id='password2' 
              value={password2} 
              onChange={onChange}
              placeholder='Confirm Password'
              required
            />
          </div>

          <div className='form-group'>
            <button className='btn btn-standard'>
              Register
            </button>
          </div>

        </form>
            
      </div>
    </>
  )
}

export default Register