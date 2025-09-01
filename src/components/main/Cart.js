import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@mui/material'
import { supabase } from '../functions/supabase'
import { useNavigate } from 'react-router-dom'

function Cart() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    const logout = async () => {
        const { error } = await supabase.auth.signOut()
        if (!error) {
            localStorage.clear()
            sessionStorage.clear()
            navigate('/')
        }
    }

    useEffect(() => {
        const checkUser = async () => {
            try {
                const { data, error } = await supabase.auth.getUser()
            } catch (error) {
                alert('Error occured')
            }

            const { data, error } = await supabase.auth.getUser()
            if (!data.user) {
                const { error } = await supabase.auth.signInWithOAuth({
                    provider: 'github',
                })
            }
        }

        checkUser()
    }, [navigate])
    return (
        <div>
            <Button
                variant="contained"
                onClick={logout}
                sx={{ my: 2 }}
            >
                Logout
            </Button>
        </div>
    )
}

export default Cart