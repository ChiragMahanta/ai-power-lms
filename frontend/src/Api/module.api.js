import axios from "axios";
export const createModuleApi = async(payload)=>{
    const res = await axios.create(`${import.meta.env.VITE_BASE_URL}/module/createPayload`,
        payload,
        {
            headers:{'content-Type': 'multipart/form-data'},
            withCredential:true
        },   
        
    )
    return res.data
}
export const getModuleApi = async()=>{
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/module/getModule/${id}`,
        
        {
            headers:{'content-Type': 'Application/json'},
            withCredential:true
        },   
        
    )
    return res.data
}

export const getCommentApi = async(id)=>{
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/module/getComment/${id}`,
        
        {
            headers:{'content-Type': 'Application/json'},
            withCredential:true
        },   
        
    )
    return res.data
}