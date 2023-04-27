import axios from 'axios'

const API_URL = '/api/posts'

const getComments = async function(postId) {

  const response = await axios.get(`${API_URL}/${postId}/comments`)
  return response.data

}

const createComment = async function(commentData, postId, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(`${API_URL}/${postId}/comments`, commentData, config)

  return response.data

}


const commentService = {
  getComments,
  createComment
}


export default commentService