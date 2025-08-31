import React from 'react'
import { Box, Container } from '@mui/material';

function Layout({ children }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Container sx={{ mt: 4, mb: 4, flex: 1, border:1 }}>
                {children}
            </Container>
        </Box>
    )
}

export default Layout