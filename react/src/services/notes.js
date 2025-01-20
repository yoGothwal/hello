import axios from "axios"
const URL = "http://localhost:5000/api/notes"
const getAll = () => {
    const res = axios.get(URL)
    return res.then(response => response.data)
}
export default { getAll }