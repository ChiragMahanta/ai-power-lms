import axios from "axios"

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
}

export const getQuizApi = async (id) => {
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/quiz/getQuiz/${id}`,
    config
  )
  return res.data
}

export const createQuiz = async (payload) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/generateQuiz`,
    payload,
    config
  )
  return res.data
}

export const createQuizApi = async (id) => {
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/CheckQuiz/${id}`,
    config
  )
  return res.data
}
