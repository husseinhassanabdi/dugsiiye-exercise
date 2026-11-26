
"use client";

import { useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import JokeCard from "../jokes/JokeCard";
import MovieCard from "../movies/MovieCard";

// type Message = {
//   role: "user" | "assistant";
//   content: string;
// };

type Message = {
  role: "user" | "assistant";
  content: string;
  joke?: {
    joke: string;
    _id: string;
  };
  movies?: {
    _id: string;
    title: string;
    year: number;
    rating?: number;
    poster?: string;
    description?: string;
    director?: string;
    cast?: string[];
    runtime?: string;
  }[];
};

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSend(message: string) {
    const updatedMessages: Message[] = [
      ...messages,
      { role: "user", content: message },
    ];

    setMessages(updatedMessages);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // setMessages([
      //   ...updatedMessages,
      //   {
      //     role: "assistant",
      //     content: data.text || JSON.stringify(data.result),
      //   },
      // ]);


setMessages([
  ...updatedMessages,
  {
    role: "assistant",
    content: data.text || JSON.stringify(data.result),
    joke: data.joke || undefined,
    movies: Array.isArray(data.result) ? data.result : undefined,
  },
]);



    } catch (error) {
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="border-b border-gray-100 px-6 py-5 text-center">
        <h1 className="text-xl font-semibold text-gray-900">
          Movie & Joke Assistant
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Ask questions, discover movies, and enjoy dad jokes.
        </p>
      </header>

      <main className="flex flex-1 justify-center overflow-y-auto px-4 py-8">
        <div className="flex w-full max-w-3xl flex-col gap-5">
          {messages.length === 0 && (
            <div className="my-auto text-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                What can I help you find?
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Ask about movies, your database, or dad jokes.
              </p>
            </div>
          )}

          {/* {messages.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
            />
          ))} */}

         {messages.map((message, index) => (
  <div key={index} className="flex flex-col gap-3">
    {message.role === "assistant" && message.joke ? (
      <JokeCard
        joke={message.joke.joke}
        jokeId={message.joke._id}
      />
    ) : message.role === "assistant" && message.movies?.length ? (
      message.movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))
    ) : (
      <ChatMessage
        role={message.role}
        content={message.content}
      />
    )}
  </div>
))}

          {loading && (
            <p className="text-sm text-gray-400">Thinking...</p>
          )}
        </div>
      </main>

      <footer className="border-t border-gray-100 px-4 py-5">
        <div className="mx-auto max-w-3xl">
          <ChatInput onSend={handleSend} disabled={loading} />
        </div>
      </footer>
    </div>
  );
}
