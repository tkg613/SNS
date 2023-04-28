import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getUser, reset } from '../features/auth/authSlice'
import { getUserPosts } from '../features/post/postSlice'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const User = () => {

  const dispatch = useDispatch()
  const {userId} = useParams()

  const {retrievedUser, isLoading, isError, message} = useSelector(state => state.auth)
  const {posts, isLoading: postIsLoading} = useSelector(state => state.post)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getUser(userId))
    dispatch(getUserPosts(userId))
    dispatch(reset())

  }, [isError, dispatch, message, userId])


  if (isLoading || postIsLoading) {
    return <Loading />
  }

  return (
    <>
      <div className='container'>
        <div className='user-info'>
          <img src={retrievedUser.image} alt='profile' />
          <h1>@{retrievedUser.name}</h1>
        </div>
      </div>
      <div className='post-container'>
        {posts.map(post => (
          <div key={post._id} className='user-post'>
            <Link key={post._id} to={`/posts/${post._id}`} className='post-link'>
                <div className='post-content'> 
                  <p>{post.text}</p>
                </div>

                <div className='post-footer'> 
                  Posted: {new Date(post.createdAt).toLocaleString('en-us')}
                </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default User