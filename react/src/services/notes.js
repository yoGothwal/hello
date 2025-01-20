import axios from "axios"
const URL = "http://localhost:5000/api/notes"
const getAll = async () => {
    console.log("notes")
    const res = await axios.get(URL)
    const notes = res.data
    console.log("notes:", notes)
    return notes
}
export default { getAll }