import React from 'react'
import { Link } from 'react-router-dom'

const CommentItem = ({comment}) => {

  return (
    <div className='comment-card'>
      <div className='post-user'>
        <img src={comment.user.image} alt='profile pic' />
        <Link to={`/users/${comment.user._id}`} className='post-link'>
          <h4>@{comment.user.name}</h4>
        </Link>
      </div>

      <hr />

      <div className='post-content'>
        <p>
          {comment.text}
        </p>
      </div>

      <div className='post-footer'> 
        Commented: {new Date(comment.createdAt).toLocaleString('en-us')}
      </div>

    </div>
  )
}

export default CommentItem