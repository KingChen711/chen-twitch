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
  bio?: string
}

export type DeleteUserParams = {
  clerkId: string
}

//* Follow Params
export type FollowUserParams = {
  followedUserId: string
}
