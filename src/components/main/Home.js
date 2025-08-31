import React, { useState, useEffect } from 'react'

import { List } from '@mui/material'

function Home() {
  const API_URL = process.env.REACT_APP_API_URL

  const [test, setTest] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTest = async () => {
    try {
      setLoading(false)
      const response = await fetch(`${API_URL}/api/test`)
      const result = await response.json()

      if (result.success) {
        setTest(result.data)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTest()
  }, [])

  if (loading) {
    return (
      <div>
        <h3>Loading... ⏳</h3>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h3>{error}</h3>
      </div>
    )
  }


  return (
    <div>
      <h3>Home</h3>
      <p>Testing data fetching 🗃️</p>
      <p>List of data from <code>test table</code></p>
      <List
        sx={{
          width: '100%',
          maxWidth: 220,
          maxHeight: 100,
          overflow: 'auto',
          bgcolor: 'background.paper',
          px: 2,
        }}
      >
        {test.map((i) => (
          <div key={i.id} >
            <small>Value: {i.value}</small>
            <br />
            <small>Created: {new Date(i.created_at).toLocaleDateString()}</small>
          </div>
        ))}
      </List>
    </div>
  )
}

export default Home