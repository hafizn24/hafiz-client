import { React, useState } from 'react'
import { TextField, Button, Box } from '@mui/material'


function CreateTest({ onInsert }) {
    const API_URL = process.env.REACT_APP_API_URL
    const [input, setInput] = useState('')

    const getSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${API_URL}/api/test/insert`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    data: input
                })
            })

            const result = await response.json()
            if (result.success) {
                alert('Success')
                setInput('')
                onInsert()
            } else {
                alert('Failed')
            }
        } catch (err) {
            alert('Error occured')
        }
    }


    return (
        <Box
            component="form"
            onSubmit={getSubmit}
        >
            <h4>Create Test</h4>
            <TextField
                label="write here"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <br />
            <Button
                type='submit'
                variant="contained"
                sx = {{my:1}}
            >
                submit
            </Button>
        </Box>
    )
}

export default CreateTest