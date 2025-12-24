"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

const Home = () => {
    const router = useRouter()
  const handleRedirect = async (id) => {
    router.push("/users")
  }
  
  return (
    <div>
     <button onClick={handleRedirect} className="fetch-user-btn">Go To Users</button>
    </div>
  )
}

export default Home