'use client';

import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { Poppins } from 'next/font/google';
import getStripe from '../utils/getStripe';
import { useUser } from '@clerk/nextjs';

const poppins = Poppins({
    weight: ['400', '600', '700'],
    subsets: ['latin'],
});

export default function PricingPage() {
    const { isSignedIn } = useUser();

    const handleSubmit = async () => {
        const checkoutSession = await fetch('/api/checkout_session', {
          method: 'POST',
          headers: {
            origin: 'http://localhost:3000',
          },
        });
        const checkoutSessionData = await checkoutSession.json();
    
        const stripe = await getStripe();
        const { error } = await stripe.redirectToCheckout({
          sessionId: checkoutSessionData.id,
        });
    
        if (error) console.error(error);
    }

    return (
        <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography
                variant="h4"
                sx={{
                    color: 'black',
                    fontFamily: poppins.style.fontFamily,
                    fontWeight: 700,
                    mb: 4,
                }}
            >
                Pricing Options
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={10} md={4}>
                    <Card sx={{ bgcolor: '#2E2E2E', color: '#ffffff', textAlign: 'center', borderRadius: 4 }}>
                        <CardContent>
                            <Typography
                                variant="h5"
                                sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 600 }}
                            >
                                Free
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{ mt: 2, fontFamily: poppins.style.fontFamily }}
                            >
                                $0 / month
                            </Typography>
                            <Typography sx={{ mt: 2, color: '#B0BEC5' }}>
                                Basic features for personal use.
                            </Typography> 
                            <Typography fontSize={20} sx={{ mt: 2, color: 'cyan', fontFamily: poppins.style.fontFamily, fontWeight: 800 }}>
                                Current Plan
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={10} md={4}>
                    <Card sx={{ bgcolor: '#2E2E2E', color: '#ffffff', textAlign: 'center', borderRadius: 4 }}>
                        <CardContent>
                            <Typography
                                variant="h5"
                                sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 600 }}
                            >
                                Pro
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{ mt: 2, fontFamily: poppins.style.fontFamily }}
                            >
                                $9.99 / month
                            </Typography>
                            <Typography sx={{ mt: 2, color: '#B0BEC5' }}>
                                All features for large teams.
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#00B8D4',
                                    fontFamily: poppins.style.fontFamily,
                                    fontWeight: 600,
                                    '&:hover': {
                                        backgroundColor: '#008C9E',
                                        fontFamily: poppins.style.fontFamily,
                                        fontWeight: 800
                                    }
                                }}
                                onClick={handleSubmit}
                            >
                                Upgrade
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
