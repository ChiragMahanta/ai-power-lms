import axios from "axios"

const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true
}

export const registerApi = async (payload) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/users/register`,
    payload,
    config
  )
  return res.data
}

export const loginApi = async (payload) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/users/login`,
    payload,
    config
  )
  return res.data
}

export const getUser = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/users/getUser`,
    config
  )
  return res.data
}

export const logoutApi = async () => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/users/logout`,
    {},
    config
  )
  return res.data
}