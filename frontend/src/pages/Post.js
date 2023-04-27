import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {getPost} from '../features/post/postSlice'
import Loading from '../components/Loading'
import { toast } from 'react-toastify'

const Post = () => {

  const dispatch = useDispatch()

  const {postId} = useParams()

  const {post, isLoading, isError, message} = useSelector(state => state.post)
  
  useEffect(() => {

    if (isError) {
      toast.error(message)
    }

    dispatch(getPost(postId))
  
  }, [dispatch, postId, isError, message])

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <h3>Something went wrong...</h3>
  }

  return (
      <div className='post-container'>
        <div className='post-card'>
          <div className='post-user'>
            <img src={post.user.image} alt='profile pic' />
            <h4>@{post.user.name}</h4>
          </div>

          <hr />

          <div className='post-content'>
            <p>
              {post.text}
            </p>
          </div>
        </div>
      </div>
      

  )
}

export default Post