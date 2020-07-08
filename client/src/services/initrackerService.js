import axios from 'axios'
const baseUrl = '/api/initracker'

let token = null

const setToken = newToken => {
  console.log('token set')
  token = `bearer ${newToken}`
  console.log(token)
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
  console.log('getall')
  return res.data
}


export default { setToken, upload, getAll }