import React from 'react'

const Register = () => {

  const onChange = function(e) {

  }

  const onSubmit = function(e) {
    e.preventDefault()
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
            <input 
              name='password' 
              type='password'
              id='password' 
              value={''} 
              onChange={onChange}
              placeholder='Confirm Password'
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