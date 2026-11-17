// // import OpenAI from "openai";
// // import dotenv from "dotenv";

// // dotenv.config();

// // const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;

// // if (!apiKey) {
// //   throw new Error("Missing API key. Set OPENROUTER_API_KEY or OPENAI_API_KEY in your .env file.");
// // }

// // const openai = new OpenAI({
// //   baseURL: "https://openrouter.ai/api/v1",
// //   apiKey,
// // });

// // const generateText = async (prompt) => {
// //   const response = await openai.chat.completions.create({
// //     model: "openai/gpt-4o-mini",
// //     messages: [{ role: "user", content: prompt }],
// //     stream: true,
// //   });

// //     let fullResponse = "";

// //   for await (const chunk of response) {
// //     const content = chunk.choices[0]?.delta?.content || "";
// //     if (content) {
// //       process.stdout.write(content);
// //       fullResponse += content;
// //     }
// //   }

// //   console.log("\n\nstream complete:");
// //   return fullResponse;
// // };

// //   // Summarize long text
// // const summarizeText = async (text, length = 'short') => {
// //   const lengthInstructions = {
// //     short: 'in 2-3 sentences'
// //   };

// //   const response = await openai.chat.completions.create({
// //     model: 'gpt-4',
// //     messages: [{
// //       role: 'user',
// //       content: `Please summarize this text ${lengthInstructions[length]}:\\n\\n${text}`
// //     }],
// //     max_tokens: length === 'short' ? 100 : length === 'medium' ? 200 : 400
// //   });

// //   return response.choices[0].message.content;
// // };

// // // Usage
// // const longArticle = `
// // Artificial intelligence has transformed the way we interact with technology...
// // [Your long text here]
// // `;



// // // print the result of the text generation
// // const result = await generateText("is Somali an independent country?");
// // console.log(result);


// // // print the result of the summarization
// // const summary = await summarizeText(longArticle, 'short');
// // console.log('Summary:', summary);

// import OpenAI from "openai";
// import dotenv from "dotenv";

// dotenv.config();

// const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;

// if (!apiKey) {
//   throw new Error("Missing API key. Set OPENROUTER_API_KEY or OPENAI_API_KEY in your .env file.");
// }

// const openai = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey,
// });

// // Summarize long text
// const summarizeText = async (text, length = 'short') => {
//   const lengthInstructions = {
//     short: 'in 2-3 sentences',
//     medium: 'in 1-2 paragraphs',
//     long: 'in 3-4 paragraphs'
//   };

//   const response = await openai.chat.completions.create({
//    model: "openai/gpt-4o-mini",
//     messages: [{
//       role: 'user',
//       content: `Please summarize this text ${lengthInstructions[length]}:\\n\\n${text}`
//     }],
//     max_tokens: length === 'short' ? 100 : length === 'medium' ? 200 : 400
//   });

//   return response.choices[0].message.content;
// };

// // Usage
// const longArticle = `
// Artificial intelligence has transformed the way we interact with technology...
// [is AI dangerous?]
// `;

// const summary = await summarizeText(longArticle, 'short');
// console.log('Summary:', summary);




import OpenAI from "openai";
import dotenv from "dotenv";
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

const MODEL = "openai/gpt-4o-mini";

// 2. Generate blog outline using streaming
const generateText = async (prompt) => {
  const response = await openai.chat.completions.create({
    model: MODEL,
    messages: [{ role: "user", content: prompt }],
    stream: true,
  });

  let fullResponse = "";

  for await (const chunk of response) {
    const content = chunk.choices[0]?.delta?.content || "";

    if (content) {
      process.stdout.write(content);
      fullResponse += content;
    }
  }

  console.log("\n\nStream complete!");

  return fullResponse;
};

// 3. Summarize long text
const summarizeText = async (text, length = "short") => {
  const lengthInstructions = {
    short: "in exactly 2 sentences",
  };

  const response = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "user",
        content: `Summarize the following text ${lengthInstructions[length]}:\n\n${text}`,
      },
    ],
  });

  return response.choices[0].message.content;
};

// 4. Answer follow-up questions
const answerQuestion = async (topic, outline, question) => {
  const response = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "system",
        content: `You are a helpful assistant. Answer follow-up questions about ${topic}.
        Use the following blog outline as context:
        ${outline}`,
      },
      {
        role: "user",
        content: question,
      },
    ],
  });

  return response.choices[0].message.content;
};

// 5. Main application
const main = async () => {
  const rl = readline.createInterface({ input, output });

  try {
    // Get topic from user
    console.log("\nWelcome to Smart Content Assistant!\n");

    const topic = await rl.question("Enter your blog topic: ");

    if (!topic.trim()) {
      console.log("Please enter a valid topic.");
      return;
    }

    // Generate blog outline
    console.log("\nGenerating your blog post outline...\n");

    const outline = await generateText(
      `Create a detailed blog post outline about ${topic}.
      Include an introduction, main sections, and conclusion.`
    );

    // Summarize outline
    console.log("\nGenerating summary...\n");

    const summary = await summarizeText(outline, "short");

    console.log("\nSummary:", summary);

    // Follow-up questions
    console.log("\nYou can now ask follow-up questions about your topic.");
    console.log("Type 'exit' to finish.\n");

    while (true) {
      const question = await rl.question("Your question: ");

      if (question.toLowerCase().trim() === "exit") {
        console.log("Thank you for using Smart Content Assistant!");
        break;
      }

      if (!question.trim()) {
        console.log("Please enter a question.");
        continue;
      }

      const answer = await answerQuestion(topic, outline, question);

      console.log("\nAnswer:", answer, "\n");
    }
  } finally {
    rl.close();
  }
};

// Run application
main().catch((error) => {
  console.error("Error:", error.message);
});
