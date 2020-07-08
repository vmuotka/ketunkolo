import axios from 'axios'
const baseUrl = '/api/initracker'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const upload = async props => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(`${baseUrl}/upload`, props, config)
  return res.data
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.get(`${baseUrl}/getall`, config)
  return res.data
}

const deleteGroup = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data
}


export default { setToken, upload, getAll, deleteGroup }