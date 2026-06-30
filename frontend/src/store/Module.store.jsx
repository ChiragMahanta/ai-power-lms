import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useUserStore = create(
    devtools((set)=>({
        module:null,
        setModule:(moduleData)=>set({module:moduleData}),
        clearModule:()=>set({user:null})
    }), 
    {name:'ModuleStore'})
)