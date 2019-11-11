import axios from 'axios'
const baseUrl = 'https://infobackendslush.herokuapp.com/api/infos'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.post(baseUrl, newObject,config)
  return request.data
}

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const poista = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.delete(`${baseUrl}/${id}`,config)
  return request.data
}

export default { getAll, create, update , poista, setToken}