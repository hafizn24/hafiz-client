import React, { useState, useEffect, useRef } from 'react'

import { List } from '@mui/material'

import CreateTest from '../functions/CreateTest'
import DeleteTest from '../functions/DeleteTest'

function Home() {
  const API_URL = process.env.REACT_APP_API_URL
  const [test, setTest] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const retryTimeout = useRef(null)

  const fetchTest = async (signal) => {
    setLoading(false)
    setError(null)

    try {
      const response = await fetch(`${API_URL}/api/test`)
      const result = await response.json()

      if (result.success) {
        setTest(result.data)
      }

    } catch (err) {
      setError("error")
      if (err.name !== 'AbortError') {
        setError(err.message || 'Something went wrong')

        retryTimeout.current = setTimeout(() => {
          fetchTest(signal)
        }, 3000)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const controller = new AbortController()
    fetchTest(controller.signal)

    return () => {
      controller.abort()
      if (retryTimeout.current) clearTimeout(retryTimeout.current)
    }
  }, [])

  return (
    <div>
      <h3>Home</h3>
      <p>Testing data fetching 🗃️</p>
      <p>List of data from <code>test table</code></p>

      {loading && (
        <small>Loading ⏳</small>
      )}

      {error && (
        <>
          <small>Error: {error}</small>
          <br />
          <small>Retrying ⏳</small>
        </>
      )}

      {!loading && !error && test.length === 0 && (
        <small>No data found</small>
      )}

      {!loading && !error && (
        <>
          <List
            sx={{
              width: '100%',
              maxWidth: 220,
              maxHeight: 100,
              overflow: 'auto',
              bgcolor: 'background.paper',
              px: 2,
              my: 2
            }}
          >
            {test.map((i) => (
              <div key={i.id}>
                <small>Value: {i.value}</small>
                <br />
                <small>Created: {new Date(i.created_at).toLocaleDateString()}</small>
              </div>
            ))}
          </List>
          <DeleteTest onDelete={fetchTest} />
        </>
      )}

      <CreateTest onInsert={fetchTest} />
    </div>
  )
}

export default Home