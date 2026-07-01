import axios from "axios"
export const purchaseCourseApi = async (payload) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/payment/checkou-session_`,
        payload,
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        }
    )
    return res.data
}
export const checkOutSuccessApi = async (sessionId) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/payment/checkout-success`,
        { id },
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        }
    )
    return res.data
}