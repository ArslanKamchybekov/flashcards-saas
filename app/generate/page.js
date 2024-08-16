'use client'
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Container, Grid, Card, CardActionArea, CardContent, Box, Typography, Paper, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Input } from "@mui/material";
import { writeBatch, getDoc, doc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    weight: ['400', '600', '700'], 
    subsets: ['latin'],
});

export default function GenerateFlashcards() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);

    const router = useRouter();

    const handleTextSubmit = async () => {
        if (!text.trim()) {
            alert('Please enter some text to generate flashcards.');
            return;
        }

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate flashcards');
            }

            const data = await response.json();
            setFlashcards(data);
        } catch (error) {
            console.error('Error generating flashcards:', error);
            alert('An error occurred while generating flashcards. Please try again.');
        }
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            
            reader.onloadend = () => {
                setImage(reader.result); // Store the base64 string in the state
            };
            
            reader.readAsDataURL(file); // Convert file to base64
        }
    };
    
    const handleImageSubmit = async () => {
        if (!image) {
            alert("Please select an image first.");
            return;
        }
    
        // Extract base64 string from data URL
        const base64Image = image.split(",")[1];
    
        try {
            const response = await fetch("/api/generate-image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    image: base64Image, // Send base64 image directly
                }),
            });
    
            if (!response.ok) {
                throw new Error("Failed to process image");
            }
    
            const data = await response.json();
            setFlashcards(data);
        } catch (error) {
            console.error("Error generating flashcards from image:", error);
            alert("An error occurred while processing the image. Please try again.");
        }
    };
    
    const handleCardClick = (id) => {
        setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const saveFlashcards = async () => {
        if (!name) {
            alert('Please enter a name for the flashcard set');
            return;
        }

        const batch = writeBatch(db);
        const userDocRef = doc(collection(db, 'users'), user.id);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || [];
            if (collections.find(collection => collection.name === name)) {
                alert('A flashcard set with that name already exists');
                return;
            } else {
                collections.push({ name });
                batch.set(userDocRef, { flashcards: collections }, { merge: true });
            }
        } else {
            batch.set(userDocRef, { flashcards: [{ name }] });
        }

        const colRef = collection(userDocRef, name);
        flashcards.forEach((flashcard) => {
            const cardDocRef = doc(colRef);
            batch.set(cardDocRef, flashcard);
        });

        await batch.commit();
        handleClose();
        router.push('/flashcards');
    };

    return (
        <Container maxWidth="md" sx={{ fontFamily: poppins.style.fontFamily }}>
            <Box sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, fontFamily: poppins.style.fontFamily }}>
                    Generate Flashcards
                </Typography>
                <Paper sx={{ p: 3, width: '100%', maxWidth: 600, mx: 'auto', mb: 4 }}>
                    <TextField
                        label="Enter text to generate flashcards"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        sx={{ mb: 3 }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleTextSubmit}
                        fullWidth
                        sx={{
                            backgroundColor: '#00B8D4',
                            color: '#ffffff',
                            fontWeight: 600,
                            '&:hover': { backgroundColor: '#008C9E' },
                        }}
                    >
                        Generate from Text
                    </Button>
                </Paper>

                <Paper sx={{ p: 3, width: '100%', maxWidth: 600, mx: 'auto' }}>
                    <Input
                        type="file"
                        onChange={handleImageChange}
                        fullWidth
                        sx={{ mb: 3 }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleImageSubmit}
                        fullWidth
                        sx={{
                            backgroundColor: '#00B8D4',
                            color: '#ffffff',
                            fontWeight: 600,
                            '&:hover': { backgroundColor: '#008C9E' },
                        }}
                    >
                        Generate from Image
                    </Button>
                </Paper>
            </Box>

            {flashcards.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 600 }}>
                        Flashcards Preview
                    </Typography>
                    <Grid container spacing={3}>
                        {flashcards.map((flashcard, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <Card
                                    sx={{
                                        bgcolor: '#2E2E2E',
                                        color: '#ffffff',
                                        borderRadius: 2,
                                        textAlign: 'center',
                                        transformStyle: 'preserve-3d',
                                        transition: 'transform 0.6s',
                                    }}
                                >
                                    <CardActionArea onClick={() => handleCardClick(index)}>
                                        <CardContent sx={{ minHeight: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                {flipped[index] ? flashcard.back : flashcard.front}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ my: 4, textAlign: 'center' }}>
                        <Button
                            variant="contained"
                            onClick={handleOpen}
                            sx={{
                                backgroundColor: '#00B8D4',
                                color: '#ffffff',
                                fontWeight: 600,
                                '&:hover': { backgroundColor: '#008C9E' },
                            }}
                        >
                            Save Flashcards
                        </Button>
                    </Box>
                </Box>
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ fontWeight: 600 }}>Save Flashcards</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Collection Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 1 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{
                        fontWeight: 600,
                        color: '#00B8D4',
                        '&:hover': { backgroundColor: '#f5f5f5' },
                    }}>Cancel</Button>
                    <Button onClick={saveFlashcards} sx={{
                        fontWeight: 600,
                        backgroundColor: '#00B8D4',
                        color: '#ffffff',
                        '&:hover': { backgroundColor: '#008C9E' },
                    }}>Save</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
