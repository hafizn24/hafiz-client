import React from 'react'
import { Button } from '@mui/material'

function DeleteTest({ onDelete }) {
    const API_URL = process.env.REACT_APP_API_URL

    const deleteData = async () => {
        try {
            const response = await fetch(`${API_URL}/api/test/delete`, {
                method: 'DELETE'
            })
            const result = await response.json()

            if (result.success) {
                onDelete()
            } else {
                alert('Failed')
            }
        } catch (err) {
            alert('Error occured')
        }
    }
    return (
        <Button
            variant="contained"
            color="error"
            onClick={() => deleteData()}
        >
            Delete Latest
        </Button>
    )
}

export default DeleteTest