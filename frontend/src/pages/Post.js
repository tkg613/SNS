import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {getPost} from '../features/post/postSlice'
import { getComments, createComment } from '../features/comment/commentSlice'
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
    dispatch(getComments(postId))
  
  }, [dispatch, postId, isError, message])

  // Comments

  const [comment, setComment] = useState('')

  const {comments, isLoading: commentIsLoading, isError: commentIsError, message: commentMessage} = useSelector(state => state.comment)

  const onChange = function(e) {
    setComment(e.target.value)
  }

  const onSubmit = function(e) {
    e.preventDefault()
    if (commentIsError){
      toast.error(commentMessage)
    }

    dispatch(createComment({comment, postId}))

  }

  if (isLoading || commentIsLoading) {
    return <Loading />
  }

  if (isError || commentIsError) {
    return <h3>Something went wrong...</h3>
  }


  return (
    <>
      <div className='post-container'>
        <div className='post-card'>
        <Link to={`/users/${post.user._id}`} className='post-link'>
          <div className='post-user'>
          
            <img src={post.user.image} alt='profile pic' />
            <h4>@{post.user.name}</h4>
          </div>
        </Link>
          <hr />

          <div className='post-content'>
            <p>
              {post.text}
            </p>
          </div>
        </div>
      </div>

      <div className='container'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <textarea
              name='comment'
              id='comment'
              value={comment}
              placeholder='Enter your comments.'
              onChange={onChange}
              required
            />
          </div>

          <div className='form-group'>
            <button className='btn btn-standard'>
              Go!
            </button>
          </div>
        </form>
      </div>

      {/* <div className='container'>
        {comments.map((com) => (
          <p>{comment.text}</p>
        ))}
      </div> */}
    </>
      
      

  )
}

export default Post