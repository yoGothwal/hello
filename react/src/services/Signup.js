import axios from "axios"

const BASE_URL = "/api/signup"
const signUp = async ({ username, password }) => {
    const res = await axios.post('/api/signup', { username, password })
    return res.data
}
export default { signUp }