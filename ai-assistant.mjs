// Secure server-side proxy for Gemini API. Keep GEMINI_API_KEY in Netlify site environment variables.
export default async (request) => {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405, headers: { "Content-Type": "application/json", "Allow": "POST" }
    });
  }
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "AI is not configured yet. Add GEMINI_API_KEY in Netlify environment variables." }), {
      status: 503, headers: { "Content-Type": "application/json" }
    });
  }
  let body;
  try { body = await request.json(); } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON request." }), { status: 400, headers: { "Content-Type": "application/json" } });
  }
  const task = typeof body.task === "string" ? body.task.trim() : "";
  const engine = body.engine === "money" ? "AI MONEY ENGINE" : "NEURO MIND ENGINE";
  const taskType = typeof body.taskType === "string" ? body.taskType.slice(0, 100) : "Analysis";
  if (!task || task.length > 6000) {
    return new Response(JSON.stringify({ error: "Please enter a task (maximum 6000 characters)." }), { status: 400, headers: { "Content-Type": "application/json" } });
  }
  const systemInstruction = `You are the careful, structured assistant inside ${engine}. Task category: ${taskType}. Respond in the same language as the user's request. Structure answer with clear headings, actionable steps, assumptions, uncertainties, and a concise next action. Do not invent citations, facts, medical diagnoses, or guarantees of profit. For hypotheses, label them as hypotheses and suggest how to test them.`;
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=" + encodeURIComponent(apiKey), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents: [{ role: "user", parts: [{ text: task }] }],
        generationConfig: { temperature: 0.65, maxOutputTokens: 1800 }
      })
    });
    const data = await response.json();
    if (!response.ok) {
      const msg = data?.error?.message || "Gemini API request failed.";
      return new Response(JSON.stringify({ error: msg }), { status: response.status, headers: { "Content-Type": "application/json" } });
    }
    const text = (data?.candidates?.[0]?.content?.parts || []).map(p => p.text || "").join("\n").trim();
    if (!text) return new Response(JSON.stringify({ error: "The AI returned an empty response. Please try again." }), { status: 502, headers: { "Content-Type": "application/json" } });
    return new Response(JSON.stringify({ result: text }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch {
    return new Response(JSON.stringify({ error: "Network error while contacting the AI provider. Please try again." }), { status: 502, headers: { "Content-Type": "application/json" } });
  }
};
