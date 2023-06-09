import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {FaHome, FaPlus, FaPeopleArrows, FaArrowCircleRight, FaArrowCircleLeft, FaRegAddressBook} from 'react-icons/fa'
import {logout, reset} from '../features/auth/authSlice'

const Navbar = () => {

  // To show register/login based on user login status
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const {user} = useSelector(state => state.auth)

  const onLogout = function() {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <div className='navbar-container'>
    
      <Link to='/' className='navbar-logo-container'>
        <FaPeopleArrows className='navbar-logo'/>
        <p>SNS</p>
      </Link>
      {user && (<h1>Hi, {user.name}...</h1>)}
      
      <div className='navbar-links'>

        {user ? (
          <>
            <Link to='/' className='navbar-login'>
              <FaHome /> 
              <p>Home</p>
            </Link>

            <Link to='/new-post' className='navbar-login'>
              <FaPlus /> 
              <p>New Post</p>
            </Link>

            <Link to='/login' className='navbar-login' onClick={onLogout}>
              <FaArrowCircleLeft /> 
              <p>Logout</p>
            </Link>
          </>
        ) : (
          <> 
            <Link to='/login' className='navbar-login'>
              <FaArrowCircleRight /> 
              <p>Login</p>
            </Link>

            <Link to='/register' className='navbar-register'>
              <FaRegAddressBook />
              <p>Register</p>
            </Link>
          </>
        )}
      </div>

    </div>
  )
}

export default Navbar