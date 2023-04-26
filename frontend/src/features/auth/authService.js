import axios from 'axios'

const API_URL = '/api/users'

const register = async function(userData) {

  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const login = async function(userData) {

  const response = await axios.post(`${API_URL}/login`, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const logout = async function() {
  localStorage.removeItem('user')
}

const authService = {
  register,
  login,
  logout
}

export default authService