'use client'
import { CircularProgress } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { Container } from 'postcss'
import { useEffect } from 'react'

 const ResultPage = () => {
    const router = useRouter()
    const searchParams = new useSearchParams(router.query)
    const session_id = searchParams.get('session_id')

    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetch = async () => {
            if (!session_id) return
            try {
                const response = await fetch(`/api/checkout_session?session_id=${session_id}`)
                const data = await response.json()
                setSession(data)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetch()
    }, [session_id])

    if (loading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        )
    }
    if (error) return <p>Error: {error.message}</p>

    return(
        <Container>
            <h1>Payment successful!</h1>
            <p>Thank you for your purchase.</p>
        </Container>
    ) 
 }