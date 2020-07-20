import axios from 'axios'
const baseUrl = '/api/monsters'

const search = async searchword => {
  const res = await axios.get(`${baseUrl}/search/${searchword}`)
  return res.data
}

export default { search }