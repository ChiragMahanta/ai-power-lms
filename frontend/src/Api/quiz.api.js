import axios from "axios"
export const getQuizApi = async(id)=>{
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/quiz/getQuiz:id`
        {
      headers: {
        "Content-Type": "application/json",
      
      withCredentials: true
    }
}
    )
    return res.data
}
export const createQuiz = async()=>{
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/generateQuiz`,
        payload,
        {
      headers: {
        "Content-Type": "application/json",
      
      withCredentials: true
    }
}
    )
    return res.data
}
export const createQuizApi = async(id)=>{
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/CheckQuiz/${id}`,
       
        {
      headers: {
        "Content-Type": "application/json",
      
      withCredentials: true
    }
}
    )
    return res.data
}