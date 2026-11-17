import OpenAI from 'openai';
import fs from 'fs/promises';
import dotenv from 'dotenv';
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";



dotenv.config();

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



// Generate image with Operouter API
    const generateImage = async (
  prompt,
  aspectRatio = "1:1",
  style = "natural"
) => {
  const response = await fetch("https://openrouter.ai/api/v1/images", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "recraft/recraft-v4.1-flash-v2:free",
    //   prompt: prompt,
    prompt: `${style} style: ${prompt}`,
      aspect_ratio: aspectRatio,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Image generation failed: ${response.status} ${await response.text()}`
    );
  }

  const result = await response.json();

  return result.data[0].b64_json;
};



// Save image to file

// const saveImage = async (imageData) => 

    const saveImage = async (imageData, prompt, aspectRatio, style) => {
  const buffer = Buffer.from(imageData, "base64");

  const filename = `images/image-${Date.now()}.png`;

//   await fs.writeFile(filename, buffer);

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
  allMetadata = [];
}

allMetadata.push(metadata);

await fs.writeFile(
  metadataFile,
  JSON.stringify(allMetadata, null, 2)
);

  console.log(`Image saved as: ${filename}`);
};



 const rl = readline.createInterface({ input, output });

 const prompt = await rl.question("Enter your image theme: ");


const styles = ["natural", "vivid"];

for (const style of styles) {
  console.log(`Generating ${style} style...`);

  const result = await generateImage(prompt, "1:1", style);

//   await saveImage(result);

await saveImage(result, prompt, "1:1", style);
}

rl.close();

