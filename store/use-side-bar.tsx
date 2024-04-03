import { create } from 'zustand'

type SideBarStore = {
  isCollapsed: boolean
  expand: () => void
  collapse: () => void
}

export const useSideBar = create<SideBarStore>((set) => ({
  isCollapsed: false,
  expand: () => set(() => ({ isCollapsed: false })),
  collapse: () => set(() => ({ isCollapsed: true }))
}))
