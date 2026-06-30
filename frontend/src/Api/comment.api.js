export const createComment = async (id, payload) => {
    const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/comment/CreateComment/${id}`,
        payload,
        {
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true,
        },
    )
    return res
}