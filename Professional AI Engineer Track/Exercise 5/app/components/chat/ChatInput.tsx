
"use client";

import { useState, FormEvent } from "react";

type ChatInputProps = {
  onSend: (message: string) => void;
  disabled?: boolean;
};

export default function ChatInput({
  onSend,
  disabled = false,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!message.trim() || disabled) return;

    onSend(message.trim());
    setMessage("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-3xl items-center gap-2"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Say something..."
        disabled={disabled}
        className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-pink-500"
      />

      <button
        type="submit"
        disabled={disabled || !message.trim()}
        className="rounded-lg bg-pink-600 px-5 py-3 text-sm text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
}
