import { React } from 'react'
import { Button } from '@mui/material'
import { supabase } from '../functions/supabase'
import { useNavigate } from 'react-router-dom'

function LoginGithub() {
    const navigate = useNavigate()
    const loginGithub = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                    redirectTo: `${window.location.origin}/cart`,
                },
            })
        } catch (err) {
            console.log(err)
            alert('Error occured')
        }
    }

    return (
        <Button
            variant="contained"
            onClick={() => loginGithub()}
            sx={{ my: 2 }}
        >
            Login with GitHub
        </Button>
    )
}

export default LoginGithub