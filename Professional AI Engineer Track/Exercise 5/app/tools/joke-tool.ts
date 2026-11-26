
import Joke from "../models/Joke";
  
// export async function getRandomJoke() 
export async function rateJoke() {
  try {
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch joke");
    }

    const data = await response.json();

    const joke = await Joke.create({
      joke: data.joke,
      category: "dad",
      source: "icanhazdadjoke",
    });

    return joke;
  } catch (error) {
    console.error("Joke API failed:", error);

    const savedJoke = await Joke.findOne();

    if (savedJoke) {
      return savedJoke;
    }

    throw new Error("No jokes available");
  }
}
