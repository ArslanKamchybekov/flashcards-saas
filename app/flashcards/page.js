'use client'
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { getDoc, setDoc, doc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/navigation";
import { Container, Grid, Card, CardActionArea, CardContent, Typography, Box, CircularProgress, TextField } from "@mui/material";

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;
      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    }
    getFlashcards();
  }, [user]);

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredFlashcards = flashcards.filter(flashcard =>
    flashcard.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isLoaded) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isSignedIn) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", textAlign: "center" }}>
        <Typography variant="h6" sx={{ color: "#888" }}>
          Please sign in to view your flashcards.
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Search Flashcards"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mb: 2 }}
        />
      </Box>
      {filteredFlashcards.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 10 }}>
          <Typography variant="h4" sx={{ color: "#888", mb: 2 }}>
            No flashcards found!
          </Typography>
          <Typography variant="body1" sx={{ color: "#aaa" }}>
            Try adjusting your search criteria or create new flashcards.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {filteredFlashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                  <CardContent sx={{ textAlign: "center", py: 6, backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
                    <Typography variant="h5" component="div" sx={{ fontWeight: "bold", color: "#333" }}>
                      {flashcard.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
