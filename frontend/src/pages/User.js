import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUser, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const User = () => {

  const dispatch = useDispatch()
  const {userId} = useParams()
  const {retrievedUser, isLoading, isError, message} = useSelector(state => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getUser(userId))

  }, [isError, dispatch, message, userId])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='container'>
      <div className='user-info'>
        <img src={retrievedUser.image} alt='profile image' />
        <h1>@{retrievedUser.name}</h1>
      </div>
    </div>
  )
}

export default User