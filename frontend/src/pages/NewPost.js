import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useState } from 'react'
import { createPost, reset } from '../features/post/postSlice'
import {toast} from 'react-toastify'
import Loading from '../components/Loading'

const NewPost = () => {

  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth)
  const {isLoading, isSuccess, isError, message} = useSelector(state => state.post)

  const [text, setText] = useState('')

  useEffect(() => {
    if (isError){
      toast.error(message)
    }
    if (isSuccess){
      dispatch(reset)
    }
    dispatch(reset)
  }, [dispatch, isError, isSuccess, message])

  const onChange = function(e) {
    setText(e.target.value)
  }

  const onSubmit = function(e) {
    e.preventDefault()
    dispatch(createPost({text}))
    setText('')
  }

  if (isLoading){
    return <Loading />
  }

  return (
    <div className='container'>

      <div className='heading'>
        <h1>Create a Post</h1>
        {/* user profile picture */}
        <p>{user.name}</p>
      </div>

      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <textarea
            name='text'
            id='text'
            value={text} 
            placeholder='What do you want to post today?'
            onChange={onChange}
          />
        </div>

        <div className='form-group'>
          <button className='btn btn-standard'>
            Go!
          </button>
        </div>
      </form>

    </div>
  )
}

export default NewPost