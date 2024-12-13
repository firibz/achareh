import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4'
    }
})
api.interceptors.response.use(
    response => {
        return response;
    },
    async (error) => {
        console.log("axios error");
        console.log(error);
        //we can show a notification instead of alert
        alert(error?.response?.data?.message || error.message || "خطایی رخ داده است.")
        return Promise.reject(error);
    },
);
export default {
    fetchAddresses() {
        return api.get('/address')
    },

    postAddress(addressData) {
        return api.post('/address', addressData)
    },

    // Add other API methods as needed
}
