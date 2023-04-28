import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {getPost} from '../features/post/postSlice'
import { getComments, createComment } from '../features/comment/commentSlice'
import Loading from '../components/Loading'
import CommentItem from '../components/CommentItem'
import { toast } from 'react-toastify'

const Post = () => {

  const dispatch = useDispatch()

  const {postId} = useParams()

  const {user} = useSelector(state => state.auth)
  const {post, isLoading, isError, message} = useSelector(state => state.post)
  const {comments, isLoading: commentIsLoading, isError: commentIsError, message: commentMessage} = useSelector(state => state.comment)

  useEffect(() => {

    if (isError || commentIsError) {
      toast.error(message)
    }

    dispatch(getPost(postId))
    dispatch(getComments(postId))
  
  }, [dispatch, postId, isError, message, commentIsError])

  // Comments

  const [comment, setComment] = useState({
    text: '',
  })

  const onChange = function(e) {
    setComment((prevState) => ({
      ...prevState,
      text: e.target.value
    }))
  }

  const onSubmit = function(e) {
    e.preventDefault()
    if (commentIsError){
      toast.error(commentMessage)
    }

    dispatch(createComment({commentData: comment, postId}))
    setComment({text: ''})
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
            <img src={post.user.image} alt='profile' />
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

      
      {user && (
        <form onSubmit={onSubmit} className='container'>
          <div className='textarea-group'>
          <p>Comment your thoughts.</p>
            <textarea
              name='comment'
              id='comment'
              value={comment.text}
              placeholder='Enter your comment.'
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
      )}

      <div className='container'>
        <p>Comments on this post:</p>
        {comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} />
        ))}
      </div>
    </>
      
  )
}

export default Post