"use client"
import { Box, Button, Grid, Typography, Card, CardContent, CircularProgress, Container, TextField } from '@mui/material';
import { SignedOut } from '@clerk/nextjs';
import Head from 'next/head';
import { Poppins } from 'next/font/google';
import { useEffect, useState } from 'react';
import { doc, collection, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');  // State for search input
  const router = useRouter();

  if (!isLoaded) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="h4">An error occurred. Please try again later.</Typography>
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

      <Box sx={{ textAlign: 'center', color: '#E0E0E0', py: 6, backgroundColor: '#1E1E1E' }}>
        <Typography
          variant="h2"
          align="center"
          sx={{
            mt: 4,
            color: '#ffffff',
            fontFamily: poppins.style.fontFamily,
            fontWeight: 800,
          }}
        >
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant="h5" align="center" sx={{ mt: 2, fontFamily: poppins.style.fontFamily }}>
          Create and study flashcards with ease
        </Typography>
        <SignedOut>
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Button
              variant="contained"
              sx={{
                padding: '10px 26px',
                backgroundColor: '#00B8D4',
                color: '#ffffff',
                borderRadius: 4,
                fontFamily: poppins.style.fontFamily,
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#008C9E',
                },
              }}
              href="/sign-in"
            >
              Explore Features
            </Button>
          </Box>
        </SignedOut>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ mt: 8, py: 6, backgroundColor: '#2E2E2E', color: '#E0E0E0' }}>
        <Container>
          <Typography variant="h4" align="center" sx={{ mb: 4, fontFamily: poppins.style.fontFamily, fontWeight: 700, color: "white"}}>
            Frequently Asked Questions
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 600 }}>
                How do I create a flashcard?
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                To create a flashcard, simply click on the "Create Flashcard" button and enter the question and answer.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 600 }}>
                Can I study my flashcards on my phone?
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Yes, you can access your flashcards on any device with an internet connection.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 600 }}>
                How do I track my progress?
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                You can track your progress by viewing your stats and performance on the dashboard.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 600 }}>
                Is Flashcard SaaS free to use?
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Yes, Flashcard SaaS is free to use with no hidden fees or subscriptions.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ mt: 8, py: 4, backgroundColor: '#1E1E1E', color: '#E0E0E0', textAlign: 'center' }}>
        <Typography variant="body2" sx={{ fontFamily: poppins.style.fontFamily }}>
          &copy; {new Date().getFullYear()} Flashcard SaaS. All rights reserved.
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, fontFamily: poppins.style.fontFamily }}>
          <a href="/privacy-policy" style={{ color: '#00B8D4', textDecoration: 'none' }}>Privacy Policy</a> | <a href="/terms" style={{ color: '#00B8D4', textDecoration: 'none' }}>Terms of Service</a>
        </Typography>
      </Box>
    </>
  );
}
