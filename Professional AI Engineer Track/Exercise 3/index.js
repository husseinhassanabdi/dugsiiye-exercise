import OpenAI from 'openai';
import fs from 'fs/promises';
import dotenv from 'dotenv';



dotenv.config();
console.log("API key loaded:", Boolean(process.env.OPENROUTER_API_KEY));



// 1. API configuration
const apiKey =
  process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error(
    "Missing API key. Set OPENROUTER_API_KEY in your .env file."
  );
}

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey,
});


// Generate speech from text
// const textToSpeech = async (text, voice = 'alloy') 
const textToSpeech = async (text, voice = 'bram') => {
  const response = await openai.audio.speech.create({
    // model: 'tts-1-hd',
    model: 'heygen/heygen-voice-1-turbo:free',
   voice: voice,
    input: text,
    // response_format: 'mp3'

    response_format: 'pcm'
  });

  const buffer = Buffer.from(await response.arrayBuffer());
  return buffer;
};

// Save audio to file
const saveAudio = async (audioBuffer, filename) => {
  await fs.writeFile(filename, audioBuffer);
  console.log(`Audio saved as: ${filename}`);
};

// Usage
// const text = "Welcome to our AI-powered application. This is generated speech!";
// const text = "Welcome My name is Hussein, I am a full stack engineer and I am learning AI. This is generated speech!";
// const audioBuffer = await textToSpeech(text, 'bram');
// // await saveAudio(audioBuffer, 'openai-speech.mp3');
// await saveAudio(audioBuffer, 'heygen-speech.pcm');



// Usage

const speaker1Text = `
Hello everyone, and welcome to today's discussion.
Today, we're going to talk about something that is changing
almost every part of our lives: Artificial Intelligence.

Think about how much technology has changed over the last
ten years. We now have smart assistants, self-driving cars,
AI-powered applications, and tools that can generate images,
videos, music, and even computer code.

But here's an interesting question.
Are we using artificial intelligence to make our lives easier,
or are we slowly becoming too dependent on it?

Personally, I believe AI is one of the most powerful tools
humanity has ever created. It can help students learn faster,
help doctors analyze medical information, and help businesses
solve problems more efficiently.

However, I also believe that we should never stop thinking
for ourselves. Technology should support human intelligence,
not replace our ability to think, create, and make decisions.

What do you think about that?
`;

const speaker2Text = `
That's a very interesting point, and I completely agree
with you on the importance of balance.

I think one of the biggest advantages of artificial
intelligence is that it gives ordinary people access
to opportunities that were once difficult to reach.

For example, someone who wants to become a programmer
can now use AI tools to understand complicated concepts,
practice writing code, and get help when something goes wrong.

A small business owner can use AI to create marketing
content, analyze customer feedback, and organize daily tasks.

But we should also talk about the challenges.

Some people are worried that AI will replace their jobs.
Others are concerned about privacy, misinformation,
and the possibility of people using AI in harmful ways.

That's why education is extremely important.
People need to understand how these systems work,
what they can do, and where their limitations are.

I believe the future belongs to people who know how
to work with technology while still using their own
creativity, experience, and critical thinking.
`;

const speaker1Audio = await textToSpeech(speaker1Text, 'bram');
const speaker2Audio = await textToSpeech(speaker2Text, 'nadine');

await saveAudio(speaker1Audio, 'speaker1.pcm');
await saveAudio(speaker2Audio, 'speaker2.pcm');