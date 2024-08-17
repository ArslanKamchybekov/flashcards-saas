"use client"
import { Box, Button, Typography, CircularProgress, Container, Grid } from '@mui/material';
import { useUser } from '@clerk/nextjs';
import Head from 'next/head';
import { Poppins } from 'next/font/google';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Carousel from 'react-responsive-carousel/lib/js/components/Carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

export default function Home() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If the user is signed in, redirect to the /flashcards page
    if (isLoaded && isSignedIn) {
      router.push('/flashcards');
    }
  }, [isLoaded, isSignedIn, router]);

  const handleGetStarted = () => {
    router.push('/sign-up');
  };

  if (!isLoaded) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>Flashcard App</title>
        <meta name="description" content="Create and study flashcards with ease" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      {!isSignedIn && (
        <Box 
          sx={{
            py: 10,
            background: 'linear-gradient(180deg, #000000 0%, #0A2B3D 100%)',
            textAlign: 'center',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Container width="lg">
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
              Transform Your Text into Flashcards Using AI
            </Typography>
            <Typography variant="h5" component="p" gutterBottom sx={{ mb: 4, color: 'white'}}>
              Enhance your learning by generating flashcards from any text in seconds
            </Typography>
            <Button variant="contained" color="primary" size="large" onClick={handleGetStarted} sx={{ backgroundColor: 'white', color: 'black', borderRadius:4, fontFamily: poppins.style.fontFamily, fontWeight: 600 }}>
              Get Started
            </Button>
          </Container>
        </Box>
      )}

      {/* Features Section */}
      {!isSignedIn && (
        <Box 
          sx={{ 
            my: 5,
            py: 5,
            borderRadius: '6px',
            backgroundColor: 'white', // White background for the rest of the page
          }}
        >
          <Container maxWidth="lg">
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom 
              sx={{ 
                textAlign: 'center', 
                fontFamily: poppins.style.fontFamily,
                fontWeight: 700,
                color: 'black'
              }}
            >
              Features
            </Typography>
            <Carousel
              showArrows={true}
              autoPlay={true}
              infiniteLoop={true}
              showThumbs={false}
              showStatus={false}
              interval={6000}
              swipeable={true} 
              dynamicHeight={false} 
              emulateTouch={true} 
              centerMode={false} 
              centerSlidePercentage={100} 
            >
              <Box sx={{ marginY: '3%', marginX: '8%', backgroundColor: '#F5F5F5', borderRadius: '31px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', p: 5 }}>
                <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 700 }}>
                  AI-Powered Conversion
                </Typography>
                <Typography variant="body2" color="black">
                  Automatically generate flashcards from any text input using advanced AI algorithms. The system is designed to intelligently extract key concepts and information from your text, transforming them into concise and effective flashcards that help you retain information better.
                </Typography>
              </Box>

              <Box sx={{ marginY: '2%', marginX: '8%', backgroundColor: '#F5F5F5', borderRadius: '31px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', p: 3 }}>
                <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 700 }}>
                  Easy Customization
                </Typography>
                <Typography variant="body2" color="black">
                  Edit and organize flashcards to fit your personal learning preferences and goals. With our easy-to-use interface, you can quickly adjust the content, format, and organization of your flashcards to match your study needs.
                </Typography>
              </Box>

              <Box sx={{ marginY: '3%', marginX: '8%', backgroundColor: '#F5F5F5', borderRadius: '31px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', p: 3 }}>
                <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 700 }}>
                  Multi-Device Access
                </Typography>
                <Typography variant="body2" color="black">
                  Access your flashcards on the go, whether you are on your phone, tablet, or computer. Our platform is designed to be fully responsive, ensuring that you can review your flashcards wherever you are, on any device.
                </Typography>
              </Box>
            </Carousel>
          </Container>
        </Box>
      )}

      {/* Pricing Section */}
      {!isSignedIn && (
        <Box 
          sx={{ 
            py: 8,
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 4, fontFamily: poppins.style.fontFamily, fontWeight: 700, color: 'black' }}>
              Pricing
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={6} md={4}>
                <Box className="feature-card" sx={{ textAlign: 'center', p: 4, backgroundColor: '#F5F5F5', color: 'black', borderRadius: 4 }}>
                  <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 700 }}>
                    Free
                  </Typography>
                  <Typography variant="body2" color="black" gutterBottom>
                    Access basic features for personal use.
                  </Typography>
                  <Typography variant="h6" component="div" sx={{ my: 2, fontWeight: 700 }}>
                    $0
                  </Typography>
                  <Typography variant="body2" color="black" sx={{ mb: 2 }}>
                    - Generate up to 50 flashcards per month
                    <br />
                    - Limited customization options
                    <br />
                    - Basic support
                  </Typography>
                  <Button variant="outlined" color="primary" onClick={handleGetStarted} sx={{ borderRadius: 4, fontFamily: poppins.style.fontFamily, fontWeight: 600, bgcolor: 'white' }}>
                    Get Started
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box className="feature-card" sx={{ textAlign: 'center', p: 4, backgroundColor: '#F5F5F5', color: 'black', borderRadius: 4 }}>
                  <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 700 }}>
                    Pro
                  </Typography>
                  <Typography variant="body2" color="black" gutterBottom>
                    Unlock advanced features for power users.
                  </Typography>
                  <Typography variant="h6" component="div" sx={{ my: 2, fontWeight: 700 }}>
                    $9.99
                  </Typography>
                  <Typography variant="body2" color="black" sx={{ mb: 2 }}>
                    - Unlimited flashcard generation
                    <br />
                    - Full customization options
                    <br />
                    - Access to new features
                  </Typography>
                  <Button variant="contained" color="primary" onClick={handleGetStarted} sx={{ borderRadius: 4, fontFamily: poppins.style.fontFamily, fontWeight: 600, bgcolor: 'black' }}>
                    Coming Soon
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}

      {/* Footer */}
      <Box sx={{ textAlign: 'center', py: 6, background: 'linear-gradient(180deg, #FFFFFF 0%, #E0E0E0 100%)' }}>
        <Typography variant="body2" sx={{ color: 'black', fontFamily: poppins.style.fontFamily }}>
          &copy; 2024 Flashcard SaaS. All rights reserved.
        </Typography>
      </Box>
    </>
  );
}
