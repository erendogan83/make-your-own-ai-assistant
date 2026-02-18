/**
 * make-your-own-chatbot — app.js
 * Handles DOM rendering, chat UI, and Cloudflare Worker API calls.
 */

/* ============================================================
 *  BOOT — render page from CONFIG
 * ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  renderPage();
  initChat();
});

function renderPage() {
  const { owner, social, skills, projects, chatbot } = CONFIG;

  // Header / Hero
  document.getElementById("ownerName").textContent = owner.name;
  document.getElementById("ownerTitle").textContent = owner.title + " · " + owner.university;
  document.getElementById("ownerBio").textContent = owner.bio;
  document.getElementById("avatarEmoji").textContent = owner.avatar;
  document.getElementById("chatBotName").textContent = chatbot.name;
  document.title = owner.name + " — AI Portfolio";

  // About
  document.getElementById("aboutText").textContent = owner.bio;
  const tagContainer = document.getElementById("skillTags");
  const allSkills = [
    ...skills.programming,
    ...skills.ml,
    ...skills.hardware.slice(0, 3),
  ];
  allSkills.forEach(s => {
    const tag = document.createElement("span");
    tag.className = "skill-tag";
    tag.textContent = s;
    tagContainer.appendChild(tag);
  });

  // Projects
  const grid = document.getElementById("projectsGrid");
  projects.forEach(p => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <div class="project-header">
        <h3>${p.name}</h3>
        <span class="project-status ${p.status === 'Completed' ? 'status-done' : 'status-wip'}">${p.status}</span>
      </div>
      <p>${p.description}</p>
      <div class="project-tech">${p.tech.map(t => `<span>${t}</span>`).join("")}</div>
      <div class="project-links">
        ${p.github ? `<a href="${p.github}" target="_blank">GitHub →</a>` : ""}
        ${p.demo ? `<a href="${p.demo}" target="_blank">Demo →</a>` : ""}
      </div>
    `;
    grid.appendChild(card);
  });

  // Contact
  const contactDiv = document.getElementById("contactLinks");
  const links = [
    { label: "📧 Email",    href: `mailto:${owner.email}`,   show: owner.email },
    { label: "💼 LinkedIn", href: social.linkedin,            show: social.linkedin },
    { label: "🐙 GitHub",   href: social.github,              show: social.github },
    { label: "🔬 ORCID",    href: social.orcid,               show: social.orcid },
    { label: "🐦 Twitter",  href: social.twitter,             show: social.twitter },
  ];
  links.filter(l => l.show).forEach(l => {
    const a = document.createElement("a");
    a.className = "contact-link";
    a.href = l.href;
    a.target = "_blank";
    a.textContent = l.label;
    contactDiv.appendChild(a);
  });
}

/* ============================================================
 *  CHAT INIT
 * ============================================================ */
function initChat() {
  const { chatbot, owner } = CONFIG;

  // Welcome message
  document.getElementById("welcomeMsg").textContent =
    chatbot.greeting.replace("{owner}", owner.name);

  // Suggestion chips
  const sugDiv = document.getElementById("suggestions");
  chatbot.suggestions.forEach(s => {
    const btn = document.createElement("button");
    btn.className = "suggestion-chip";
    btn.textContent = s;
    btn.onclick = () => {
      document.getElementById("chatInput").value = s;
      sendMessage();
    };
    sugDiv.appendChild(btn);
  });
}

/* ============================================================
 *  CHAT TOGGLE
 * ============================================================ */
function toggleChat() {
  const win = document.getElementById("chatWindow");
  const fab = document.getElementById("chatFab");
  const badge = document.getElementById("chatBadge");
  win.classList.toggle("open");
  fab.classList.toggle("active");
  badge.style.display = "none";
  if (win.classList.contains("open")) {
    document.getElementById("chatInput").focus();
  }
}

function openChat() {
  const win = document.getElementById("chatWindow");
  if (!win.classList.contains("open")) toggleChat();
}

/* ============================================================
 *  MESSAGING
 * ============================================================ */
let conversationHistory = [];

function handleKey(e) {
  if (e.key === "Enter" && !e.shiftKey) sendMessage();
}

async function sendMessage() {
  const input = document.getElementById("chatInput");
  const userText = input.value.trim();
  if (!userText) return;

  input.value = "";
  appendMessage(userText, "user");
  hideSuggestions();

  const typingId = showTyping();

  try {
    const reply = await callWorker(userText);
    removeTyping(typingId);
    appendMessage(reply, "bot");
  } catch (err) {
    removeTyping(typingId);
    appendMessage("Sorry, I couldn't connect to the AI. Please check the setup. ⚠️", "bot");
    console.error(err);
  }
}

function appendMessage(text, role) {
  const container = document.getElementById("chatMessages");
  const div = document.createElement("div");
  div.className = `message ${role}-message`;

  const bubble = document.createElement("div");
  bubble.className = "message-content";
  bubble.textContent = text;

  div.appendChild(bubble);
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function showTyping() {
  const id = "typing-" + Date.now();
  const container = document.getElementById("chatMessages");
  const div = document.createElement("div");
  div.className = "message bot-message";
  div.id = id;
  div.innerHTML = `<div class="message-content typing-indicator"><span></span><span></span><span></span></div>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return id;
}

function removeTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function hideSuggestions() {
  document.getElementById("suggestions").style.display = "none";
}

/* ============================================================
 *  CLOUDFLARE WORKER API CALL
 * ============================================================ */
async function callWorker(userMessage) {
  // Build context from CONFIG (sent once as system context)
  const context = buildContext();

  conversationHistory.push({ role: "user", content: userMessage });

  const response = await fetch(CONFIG.apiEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: userMessage,
      history: conversationHistory.slice(-10),  // last 10 turns
      context: context,
      language: CONFIG.chatbot.bilingual ? detectLanguage(userMessage) : CONFIG.chatbot.language,
    }),
  });

  if (!response.ok) {
    throw new Error(`Worker responded with ${response.status}`);
  }

  const data = await response.json();
  const assistantReply = data.reply || "No response.";
  conversationHistory.push({ role: "assistant", content: assistantReply });

  return assistantReply;
}

function buildContext() {
  const { owner, research, projects, skills, publications, social } = CONFIG;
  return {
    owner,
    thesis: research.thesis,
    interests: research.interests,
    projects: projects.map(p => ({ name: p.name, description: p.description, tech: p.tech, status: p.status })),
    skills,
    publications,
    contact: { email: owner.email, ...social },
  };
}

function detectLanguage(text) {
  // Very simple heuristic — checks for common Turkish characters
  const turkishPattern = /[çğışöüÇĞİŞÖÜ]/;
  return turkishPattern.test(text) ? "tr" : "en";
}
