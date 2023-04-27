import axios from 'axios'

const API_URL = '/api/posts'

const getPosts = async function() {

  const response = await axios.get(API_URL)
  return response.data

}

const createPost = async function(postData, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL, postData, config)

  return response.data

}


const postService = {
  getPosts,
  createPost
}


export default postService