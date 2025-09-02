import { streamText } from "ai";

export async function POST(request: Request) {
  const { model, messages } = await request.json();

  const result = streamText({
    model: model,
    messages: messages,
  });

  let resultMessage = "";
  for await (const textPart of result.textStream) {
    resultMessage += textPart;
  }

  return Response.json({ message: resultMessage });
}
