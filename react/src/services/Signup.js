import axios from "axios"

const signUp = async ({ username, password }) => {
    const res = await axios.post('/api/signup', { username, password })
    return res.data
}
export default { signUp }