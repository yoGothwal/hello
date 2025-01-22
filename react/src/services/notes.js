import axios from "axios"
const BASE_URL = "http://localhost:5000/api/notes"
const getAll = async () => {
    const res = await axios.get(`${BASE_URL}`)
    return res.data
}
const create = async (noteObject) => {
    const res = await axios.post(`${BASE_URL}`, noteObject)
    return res.data
}
const remove = async (id) => {
    const res = axios.delete(`${BASE_URL}/${id}`)
    return res.data
}
export default { getAll, create, remove }