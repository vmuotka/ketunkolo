import axios from 'axios'
const baseUrl = '/api/spells'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const search = async props => {
  const res = await axios.post(`${baseUrl}/search`, props)
  return res.data
}

const getSpellById = async id => {
  const res = await axios.get(`${baseUrl}/get/${id}`)
  return res.data
}

const getByUser = async () => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(`${baseUrl}/getbyuser`, {}, config)
  return res.data
}

const save = async (spell) => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(`${baseUrl}/upload`, spell, config)
  return res.data
}

const deleteSpell = async (data) => {
  const config = {
    headers: { Authorization: token },
    data
  }
  const res = await axios.delete(`${baseUrl}/delete`, config)
  return res.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { search, getSpellById, getByUser, setToken, save, deleteSpell }