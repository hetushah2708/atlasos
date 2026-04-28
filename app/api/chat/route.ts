export async function POST(req: Request) {
  try {
    console.log("KEY EXISTS:", !!process.env.OPENROUTER_API_KEY);

    const { message } = await req.json();

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          model: "openai/gpt-oss-20b:free",
          max_tokens: 80,
          temperature: 0.7,

          messages: [
            {
              role: "system",
              content:
                "Reply under 50 words unless user asks detailed explanation."
            },
            {
              role: "user",
              content: message
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log(data);

    return Response.json({
      reply: data.choices?.[0]?.message?.content || "No response"
    });

  } catch (e) {
    console.error(e);

    return Response.json(
      {
        reply: "API failed"
      },
      { status: 500 }
    );
  }
}