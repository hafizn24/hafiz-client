import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@mui/material'
import { supabase } from '../functions/supabase'
import { useNavigate } from 'react-router-dom'

import LoginGithub from '../functions/LoginGithub'

function Cart() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    const logout = async () => {
        try {
            const { error } = await supabase.auth.signOut()
            if (!error) {
                navigate('/')
            }

        } catch (error) {
            alert('Error occured')
        }
    }

    const checkUser = async () => {
        try {
            const { data, error } = await supabase.auth.getUser()
            setUser(data.user)
        } catch (error) {
            setUser(null)
            alert('Error occured')
        }
    }

    useEffect(() => {
        checkUser()
    }, [])
    return (


        <div>
            {!user && (
                <>
                    <h3>Only user can access here</h3>
                    <p>Please Login</p>
                    <LoginGithub />
                </>
            )}
            {user && (
                <Button
                    variant="contained"
                    onClick={logout}
                    sx={{ my: 2 }}
                >
                    Logout
                </Button>
            )}
        </div>
    )
}

export default Cart