import React from 'react'
import { Link } from 'react-router-dom'
import {FaPeopleArrows, FaArrowCircleRight, FaRegAddressBook} from 'react-icons/fa'


const Navbar = () => {

  // To show register/login based on user login status

  return (
    <div className='navbar-container'>
    
      <Link to='/' className='navbar-logo-container'>
        <FaPeopleArrows className='navbar-logo'/>
        <p>SNS</p>
      </Link>

      <div className='navbar-links'>

          <Link to='/login' className='navbar-login'>
            <FaArrowCircleRight /> 
            <p>Login</p>
          </Link>

          <Link to='/register' className='navbar-register'>
            <FaRegAddressBook />
            <p>Register</p>
          </Link>

      </div>

    </div>
  )
}

export default Navbar