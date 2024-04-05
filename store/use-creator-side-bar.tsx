import { create } from 'zustand'

type CreatorSideBarStore = {
  isCollapsed: boolean
  expand: () => void
  collapse: () => void
}

export const useCreatorSideBar = create<CreatorSideBarStore>((set) => ({
  isCollapsed: false,
  expand: () => set(() => ({ isCollapsed: false })),
  collapse: () => set(() => ({ isCollapsed: true }))
}))
