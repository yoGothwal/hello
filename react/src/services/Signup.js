import axios from "axios"

const signUp = async ({ username, password }) => {
    const res = await axios.post('http://localhost:5000/api/signup', { username, password })
    return res.data
}
export default { signUp }