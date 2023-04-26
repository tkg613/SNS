import React from 'react'
import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getPosts, reset} from '../features/post/postSlice'

const Home = () => {

  const dispatch = useDispatch()
  const {posts, isLoading, isSuccess, isError} = useSelector(state => state.post)

  useEffect(() => {
    dispatch(getPosts)
  })

  return (
    <>
      {posts}
    </>
  )
}

export default Home