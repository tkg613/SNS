import React from 'react'
import { Link } from 'react-router-dom'

const PostItem = ({post}) => {

  return (
    <div className='post-card'>
      <div className='post-user'>
        <img src={post.user.image} alt='profile pic' />
        <Link to={`/users/${post.user._id}`} className='post-link'>
          <h4>@{post.user.name}</h4>
        </Link>
      </div>

      <hr />

      <div className='post-content'>
      <Link to={`/posts/${post._id}`} className='post-link'>
        <p>
          {
            post.text.length > 300 
            ? (post.text.substring(0, 100) + '...')  
            : post.text
          }
        </p>
      </Link>
        
      </div>

      <div className='post-footer'> 
        Posted: {new Date(post.createdAt).toLocaleString('en-us')}
      </div>

    </div>
  )
}

export default PostItem