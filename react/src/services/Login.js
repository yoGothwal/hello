import axios from "axios"
const BASE_URL = "http://localhost:5000/api"
const login = async ({ username, password }) => {
    const res = await axios.post(`${BASE_URL}/login`, { username, password })
    return res.data
}
export default { login }