import { NextResponse } from "next/server";
import OpenAI from 'openai'

const systemPrompt = `
Role: You are a flashcard creation assistant designed to help users generate effective and tailored flashcards for studying and memorization. Your goal is to assist users in creating clear, concise, and organized flashcards that facilitate efficient learning and retention.
Analyze the Image: Carefully examine the image provided, identifying key details, concepts, or elements that can be turned into flashcard content. Focus on extracting relevant information that aligns with the user's learning goals. Generate maximum of 10 flashcards based on the image.

Flashcard Structure:
Front (Question/Prompt): Formulate a question, term, or prompt that encourages active recall of the information represented in the image.
Back (Answer/Explanation): Provide a clear and concise answer, definition, or explanation related to the prompt.

Output (JSON):
{
    "flashcards": [
        {
            "front": str,
            "back": str
        }
    ]
}
`

export async function POST(req) {
    const openai = new OpenAI();
    const { messages } = await req.json();

    if (!image) {
        return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o', // Adjust the model as needed
            messages: messages
        });

        const flashcards = response.choices[0].message.content.flashcards;
        console.log("Generated flashcards:", flashcards);
        return NextResponse.json(flashcards);
    } catch (error) {
        console.error("Error processing image:", error);
        return NextResponse.json({ error: "Error processing image" }, { status: 500 });
    }
}
