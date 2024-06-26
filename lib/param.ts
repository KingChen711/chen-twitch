//* User Params
export type GetUserByIdParams = {
  id: string
}

export type GetUserByUsernameParams = {
  username: string
}

export type CreateUserParams = {
  clerkId: string
  username: string
  imageUrl: string
}

export type UpdateUserParams = {
  username: string
  imageUrl?: string
}

export type UpdateUserBio = {
  bio: string
}

export type DeleteUserParams = {
  clerkId: string
}

export type GetCreatorParams = {
  username: string
}

//* Follow Params
export type FollowUserParams = {
  followedUserId: string
}

//* Block Params
export type BlockUserParams = {
  blockedUserId: string
}

//* Stream Params
export type GetStreamByUserId = {
  userId: string
}

export type UpdateStreamParams = {
  thumbnailUrl?: string | null
  name?: string
  isChatEnabled?: boolean
  isChatDelayed?: boolean
  isChatFollowersOnly?: boolean
}
