import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useUserStore = create(
  devtools((set) => ({
    // User state
    user: null,
    setUser: (userData) => set({ user: userData }),
    clearUser: () => set({ user: null }),

    // Module state
    module: null,
    setModule: (moduleData) => set({ module: moduleData }),
    clearModule: () => set({ module: null }),
  }),
  { name: 'AppStore' })
)