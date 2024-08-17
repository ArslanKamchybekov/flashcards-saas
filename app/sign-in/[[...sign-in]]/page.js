import React from 'react'
import { Box } from '@mui/material'
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
    return(
        <Box
            sx={{
                bgcolor: '#121212',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <SignIn />
        </Box>
    )
}
