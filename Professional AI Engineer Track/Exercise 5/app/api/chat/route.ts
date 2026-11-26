
import { executeDatabaseQuestion } from "../../tools/database-tool";
import { dbConnect } from "../../lib/db";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return Response.json(
        { error: "Please provide a question." },
        { status: 400 }
      );
    }

    await dbConnect();

    const result = await executeDatabaseQuestion(prompt);

    // return Response.json({
    //   success: true,
    //   result,
    //   text: JSON.stringify(result),
    // });

    return Response.json({
  success: true,
  result,
  joke: result?.joke ? result : null,
  text: JSON.stringify(result),
});
  } catch (error) {
    console.error("Database query error:", error);

    return Response.json(
      { error: "Failed to process your database question." },
      { status: 500 }
    );
  }
}
