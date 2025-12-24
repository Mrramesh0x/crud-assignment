"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

const dynamicUser = () => {
  const { id } = useParams()
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [edit, setEdit] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    const fetchSingleUser = async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      const data = await res.json()
      setUser(data)
      setName(data.name)
      setEmail(data.email)
    }

    if (id) fetchSingleUser()
  }, [id])

  const updateUser = async (e) => {
    e.preventDefault()

    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
    })

    setUser(prev => ({
      ...prev,
      name,
      email
    }))

    setEdit(false)
  }

  const deleteUser = async () => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE"
    })

    router.push("/users")
  }

  if (!user) return <div className="loading">Loading Getting data from server</div>

  return (
    <div className="user-page">
      {!edit ? (
        <>
          <h2 className="title">{user.name}</h2>
          <p className="email">{user.email}</p>

          <div className="actions">
            <button className="update-btn" onClick={() => setEdit(true)}>
              Update
            </button>
            <button className="delete-btn" onClick={deleteUser}>
              Delete
            </button>
          </div>
        </>
      ) : (
        <form className="update-form" onSubmit={updateUser}>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
          />
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  )
}

export default dynamicUser
