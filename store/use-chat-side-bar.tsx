import { create } from 'zustand'

export enum ChatVariant {
  CHAT = 'CHAT',
  COMMUNITY = 'COMMUNITY'
}

type ChatSideBarStore = {
  isCollapsed: boolean
  variant: ChatVariant
  expand: () => void
  collapse: () => void
}

export const useChatSideBar = create<ChatSideBarStore>((set) => ({
  isCollapsed: false,
  variant: ChatVariant.CHAT,
  expand: () => set(() => ({ isCollapsed: false })),
  collapse: () => set(() => ({ isCollapsed: true }))
}))
