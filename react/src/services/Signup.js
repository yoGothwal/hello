import axios from "axios";
const BASE_URL = "/api/signup";

const sendOtp = async (email) => {
    const res = await axios.post(`${BASE_URL}/send-otp`, { email });
    console.log(res)
    return res.data;
};

const verifyOtp = async (email, otp) => {
    const res = await axios.post(`${BASE_URL}/verify-otp`, { email, otp });
    return res.data;
};

const signUp = async ({ email, username, password }) => {
    const res = await axios.post(BASE_URL, { email, username, password });
    return res.data;
};

export default { sendOtp, verifyOtp, signUp };
