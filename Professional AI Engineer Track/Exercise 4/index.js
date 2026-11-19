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


// Cost and usage tracking
const usage = {
  text: 0,
  image: 0,
  audio: 0,
};



// 2. Generate content using the OpenRouter API
const generateContent = async (prompt) => {
  const response = await openai.chat.completions.create({
    model: 'nvidia/nemotron-3-ultra-550b-a55b:free',
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ]
  });

   usage.text++; 

  console.log("Token usage:", response.usage);

  return response.choices[0].message.content;
};


const saveText = async (content) => {
  await fs.mkdir("exports", { recursive: true });

  const filename = `exports/article-${Date.now()}.txt`;

  await fs.writeFile(filename, content, "utf-8");

  console.log(`Text saved as: ${filename}`);
};






// 3. Generate image using the OpenRouter API
const generateImage = async (
  prompt,
  aspectRatio = "1:1",
  style = "natural"
) => {
  const response = await fetch(
    "https://openrouter.ai/api/v1/images",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "recraft/recraft-v4.1-flash-v2:free",
        prompt: `${style} style: ${prompt}`,
        aspect_ratio: aspectRatio,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Image generation failed: ${response.status} ${await response.text()}`
    );
  }

  usage.image++;

  const result = await response.json();

  return result.data[0].b64_json;
};



const saveImage = async (imageData, prompt, aspectRatio, style) => {
  await fs.mkdir("images", { recursive: true });

  const buffer = Buffer.from(imageData, "base64");

  const filename = `images/image-${Date.now()}.png`;

  await fs.writeFile(filename, buffer);

  const metadata = {
    filename,
    prompt,
    aspectRatio,
    style,
    generatedAt: new Date().toISOString(),
  };

  const metadataFile = "images/metadata.json";

  let allMetadata = [];

  try {
    const existingData = await fs.readFile(metadataFile, "utf-8");
    allMetadata = JSON.parse(existingData);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  allMetadata.push(metadata);

  await fs.writeFile(
    metadataFile,
    JSON.stringify(allMetadata, null, 2)
  );

  console.log(`Image saved as: ${filename}`);
};



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

   usage.audio++;

  const buffer = Buffer.from(await response.arrayBuffer());
  return buffer;
};


// Save audio to file
const saveAudio = async (audioBuffer, filename) => {
  await fs.mkdir("audio", { recursive: true });

  const filePath = `audio/${filename}`;

  await fs.writeFile(filePath, audioBuffer);

  console.log(`Audio saved as: ${filePath}`);
};



// 3. Example usage of textToSpeech
const text = "Hello! My name is Hussein. I am a computer science graduate, and I am currently learning full-stack development and artificial intelligence. My goal is to become a professional Full-Stack AI Engineer. I have been learning technologies such as JavaScript, React, Next.js, Node.js, Express, MongoDB, and TypeScript. I enjoy building applications, solving programming problems, and understanding how different technologies work together. Recently, I started exploring AI engineering using Node.js and OpenRouter. I am experimenting with AI-powered text generation, image generation, and text-to-speech applications. I am also interested in AI agents and how they can automate everyday tasks, improve productivity, and help developers build smarter applications. My long-term ambition is to create modern web and mobile applications powered by artificial intelligence. I believe that becoming a good software engineer requires patience, consistency, creativity, and continuous learning. I am still learning, making mistakes, fixing errors, and improving my skills every day. This is my journey into software development and artificial intelligence, and I am excited about what the future holds.";
const audioBuffer = await textToSpeech(text, 'bram');
// await saveAudio(audioBuffer, 'openai-speech.mp3');
await saveAudio(audioBuffer, 'heygen-speech.pcm');



// 1. Generate audio
try {
  const audioBuffer = await textToSpeech(
   "Hello! My name is Hussein. I am a computer science graduate, and I am currently learning full-stack development and artificial intelligence. My goal is to become a professional Full-Stack AI Engineer. I have been learning technologies such as JavaScript, React, Next.js, Node.js, Express, MongoDB, and TypeScript. I enjoy building applications, solving programming problems, and understanding how different technologies work together. Recently, I started exploring AI engineering using Node.js and OpenRouter. I am experimenting with AI-powered text generation, image generation, and text-to-speech applications. I am also interested in AI agents and how they can automate everyday tasks, improve productivity, and help developers build smarter applications. My long-term ambition is to create modern web and mobile applications powered by artificial intelligence. I believe that becoming a good software engineer requires patience, consistency, creativity, and continuous learning. I am still learning, making mistakes, fixing errors, and improving my skills every day. This is my journey into software development and artificial intelligence, and I am excited about what the future holds.",
    "bram"
  );


  await saveAudio(audioBuffer, "heygen-speech.pcm");
await saveUsage();

} catch (error) {
  console.error("Audio generation failed:", error.message);
}


// 2. Generate text
try {
const result = await generateContent(
  "Write a short article about how AI is changing education."
);

// console.log(result);

// await saveText(result);

await saveText(result);
await saveUsage();

} catch (error) {
  console.error("Text generation failed:", error.message);
}




// 3. Generate image
try {
  const prompt = "A futuristic classroom with students learning AI";

  const image = await generateImage(prompt, "1:1", "natural");


  await saveImage(image, prompt, "1:1", "natural");
await saveUsage();

} catch (error) {
  console.error("Image generation failed:", error.message);
}



// Save usage data to a JSON file
const saveUsage = async () => {
  await fs.mkdir("exports", { recursive: true });

  const usageData = {
    ...usage,
    updatedAt: new Date().toISOString(),
  };

  await fs.writeFile(
    "exports/usage.json",
    JSON.stringify(usageData, null, 2),
    "utf-8"
  );

  console.log("Usage data saved.");
};