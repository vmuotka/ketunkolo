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


export default { setToken, upload }