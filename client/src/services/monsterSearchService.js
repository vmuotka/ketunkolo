import axios from 'axios'
const baseUrl = '/api/monsters'

const search = async searchword => {
  const res = await axios.get(`${baseUrl}/search/${searchword}`)
  return res.data
}

const getMonsterById = async id => {
  const res = await axios.get(`${baseUrl}/get/${id}`)
  return res.data
}

export default { search, getMonsterById }