import React from 'react'

interface usersdetailProps {
  params: Promise<{
    username: string
  }>
}

const usersdetail = async ({ params }: usersdetailProps) => {
  const { username } = await params
  return (
    <div>Welcome {username} </div>
  )
}

export default usersdetail;
