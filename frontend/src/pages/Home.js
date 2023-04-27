import React from 'react'
import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getPosts, reset} from '../features/post/postSlice'
import Loading from '../components/Loading'
import PostItem from '../components/PostItem'

const Home = () => {

  const dispatch = useDispatch()
  const {posts, isLoading, isSuccess, isError} = useSelector(state => state.post)

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  if (isLoading) {
    return <Loading />
  }
  
  const sortedPosts = posts.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      <div className='post-container'>
        {sortedPosts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </>
  )
}

export default Home