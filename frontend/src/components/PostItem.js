import React from 'react'
import { Link } from 'react-router-dom'

const PostItem = ({post}) => {
  return (
    <div className='post-card'>
      <div className='post-user'>
        <img src={post.user.image} alt='profile pic' />
        <h4>@{post.user.name}</h4>
      </div>
      <hr />
      <div className='post-content'>
        <p>
          {
            post.text.length > 300 
            ? (post.text.substring(0, 100) + '...')  
            : post.text
          }
        </p>
      </div>

      {/* Feature to like posts */}
      {/* <div className='card-footer'>
        <p>Likes: {post.likes}</p>
        <FaHeart />
      </div> */}
    </div>
  )
}

export default PostItem