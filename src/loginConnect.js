import axios from 'axios'
const baseUrl = 'https://infobackendslush.herokuapp.com/api/login'

const login = async newObject => {
  const request = await axios.post(baseUrl, newObject)
  return request.data
}


export default { login}