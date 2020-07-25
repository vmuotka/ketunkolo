import axios from 'axios'
const baseUrl = '/api/monsters'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const search = async props => {
  const res = await axios.post(`${baseUrl}/search`, props)
  return res.data
}

const getMonsterById = async id => {
  const res = await axios.get(`${baseUrl}/get/${id}`)
  return res.data
}

const save = async (monster) => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(`${baseUrl}/upload`, monster, config)
  return res.data
}

const getByUser = async () => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(`${baseUrl}/getbyuser`, {}, config)
  return res.data
}

export default { search, getMonsterById, setToken, save, getByUser }