/**
 * make-your-own-chatbot — Cloudflare Worker (worker.js)
 *
 * This worker sits between your GitHub Pages site and the Groq API.
 * It keeps your API key secret and builds the AI system prompt
 * from the context sent by the frontend.
 *
 * Deploy:  wrangler deploy
 * Secrets: wrangler secret put GROQ_API_KEY
 */

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// ----- CORS helper -----
const corsHeaders = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function corsResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// ----- Build system prompt from context -----
function buildSystemPrompt(context, language) {
  const { owner, thesis, interests, projects, skills, publications, contact } = context;

  const lang = language === "tr" ? "Turkish" : "English";

  return `You are an AI assistant representing ${owner.name}, a ${owner.title} at ${owner.university}.
Respond in ${lang}. If the user writes in Turkish, reply in Turkish. If in English, reply in English.

=== ABOUT ===
Name: ${owner.name}
Title: ${owner.title}
University: ${owner.university}
Email: ${contact.email || "N/A"}
LinkedIn: ${contact.linkedin || "N/A"}
GitHub: ${contact.github || "N/A"}
ORCID: ${contact.orcid || "N/A"}
Bio: ${owner.bio}

=== THESIS ===
Title: ${thesis.title}
Advisor: ${thesis.advisor}
Status: ${thesis.status}
Keywords: ${thesis.keywords.join(", ")}
Abstract: ${thesis.abstract}

=== RESEARCH INTERESTS ===
${interests.join(", ")}

=== PROJECTS ===
${projects.map(p => `- ${p.name} [${p.status}]: ${p.description} (Tech: ${p.tech.join(", ")})`).join("\n")}

=== SKILLS ===
Programming: ${skills.programming.join(", ")}
ML/AI: ${skills.ml.join(", ")}
Hardware: ${skills.hardware.join(", ")}
Tools: ${skills.tools.join(", ")}
Languages: ${skills.languages.join(", ")}

=== PUBLICATIONS ===
${publications.length > 0
  ? publications.map(p => `- ${p.title} (${p.venue}, ${p.year})`).join("\n")
  : "No publications listed yet (thesis in progress)."}

=== INSTRUCTIONS ===
- Answer questions about ${owner.name}'s background, research, projects, skills, and contact info.
- Be friendly, professional, and concise.
- If asked something you don't know, say so honestly and suggest the user contact ${owner.name} directly at ${contact.email || "the email provided on the website"}.
- Never make up information that isn't in the context above.
- Keep responses under 200 words unless a detailed explanation is specifically requested.
- You can explain technical concepts when asked.`;
}

// ----- Main handler -----
export default {
  async fetch(request, env) {

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return corsResponse({ error: "Method not allowed" }, 405);
    }

    // Parse body
    let body;
    try {
      body = await request.json();
    } catch {
      return corsResponse({ error: "Invalid JSON" }, 400);
    }

    const { message, history = [], context = {}, language = "en" } = body;

    if (!message) {
      return corsResponse({ error: "message is required" }, 400);
    }

    // Build messages array for Groq
    const systemPrompt = buildSystemPrompt(context, language);

    const messages = [
      { role: "system", content: systemPrompt },
      // Include conversation history (max last 10 turns)
      ...history.slice(-10).map(h => ({ role: h.role, content: h.content })),
      { role: "user", content: message },
    ];

    // Call Groq API
    let groqResponse;
    try {
      groqResponse = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type":  "application/json",
          "Authorization": `Bearer ${env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model:       "llama-3.3-70b-versatile",
          messages,
          max_tokens:  512,
          temperature: 0.7,
          stream:      false,
        }),
      });
    } catch (err) {
      return corsResponse({ error: "Failed to reach Groq API", detail: err.message }, 502);
    }

    if (!groqResponse.ok) {
      const errText = await groqResponse.text();
      return corsResponse({ error: "Groq API error", detail: errText }, groqResponse.status);
    }

    const groqData = await groqResponse.json();
    const reply = groqData.choices?.[0]?.message?.content || "I couldn't generate a response.";

    return corsResponse({ reply });
  },
};
