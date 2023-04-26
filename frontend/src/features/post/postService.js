import axios from 'axios'

const API_URL = '/api/posts'

const getPosts = async function() {

  const response = await axios.get(API_URL)
  return response.data

}


const postService = {
  getPosts
}


export default postService