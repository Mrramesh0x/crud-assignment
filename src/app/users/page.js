"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const Users = () => {
  const [users, setUsers] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users")
      const data = await res.json()
      setUsers(data)
    }

    fetchUsers()
  }, [])

  const handleRedirect = async (id) => {
    router.push(`/users/${id}`)
  }

  return (
    <div className="users">
      {users.map(user => (
        <div className="user-card" key={user.id}>
          <h3 className="name">{user.name}</h3>
          <p className="email">{user.email}</p>
          <button className="view-btn" onClick={() => handleRedirect(user.id)}>
            View
          </button>
        </div>
      ))}
    </div>
  )
}

export default Users
