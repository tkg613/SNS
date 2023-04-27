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

  return (
    <>
      <div className='post-container'>
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </>
  )
}

export default Home