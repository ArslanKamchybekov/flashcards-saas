'use client'
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { getDocs, setDoc, doc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { Container, Grid, Card, CardActionArea, CardContent, Typography, Box, CircularProgress } from "@mui/material";
import { useSearchParams } from "next/navigation";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});

  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;
      const colRef = collection(doc(collection(db, "users"), user.id), search);
      const docs = await getDocs(colRef);
      const flashcards = [];
      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() });
      });
      setFlashcards(flashcards);
    }
    getFlashcard();
  }, [user, search]);

  const handleCardClick = (id) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
      {flashcards.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 10 }}>
          <Typography variant="h4" sx={{ color: "#888", mb: 2 }}>
            No flashcards available!
          </Typography>
          <Typography variant="body1" sx={{ color: "#aaa" }}>
            Please create some flashcards to begin studying.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {flashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  perspective: "1000px",
                  "&:hover .flip-card-inner": {
                    transform: "rotateY(180deg)",
                  },
                }}
              >
                <CardActionArea onClick={() => handleCardClick(flashcard.id)}>
                  <Box
                    className="flip-card-inner"
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: "250px",
                      transformStyle: "preserve-3d",
                      transition: "transform 0.6s",
                      transform: flipped[flashcard.id] ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                  >
                    {/* Front of the card */}
                    <CardContent
                      sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f5f5f5",
                        borderRadius: 2,
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
                        {flashcard.front}
                      </Typography>
                    </CardContent>

                    {/* Back of the card */}
                    <CardContent
                      sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#00B8D4",
                        borderRadius: 2,
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
                        {flashcard.back}
                      </Typography>
                    </CardContent>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
