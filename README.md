# NEURO MIND ENGINE + AI MONEY ENGINE — v0.2 AI connection scaffold

This package upgrades the static v0.1 prototype with a Netlify Function proxy for Gemini API.

## Important
- The Gemini API key is read only from Netlify environment variable `GEMINI_API_KEY`; never put it into frontend files or send it in chat.
- The server function requires a Git-connected Netlify deploy or Netlify CLI build. A plain drag-and-drop static deploy may not compile/deploy functions.
- Before publicly sharing an AI-enabled endpoint, add request limits / abuse protection and review provider data handling.
- Gemini free tier eligibility and quotas vary by account/model; usage may become paid if billing is enabled.
- Current configured model endpoint: `gemini-3.8-flash`; model access can vary by account and may need changing.

## Deployment outline
1. Upload this folder to a GitHub repository (root should contain `index.html`, `app.js`, `styles.css`, `netlify.toml`, and `netlify/functions/ai-assistant.mjs`).
2. In Netlify, import/link the GitHub repository as a new site (or connect it to your existing site).
3. In Netlify Site configuration / Environment variables, add `GEMINI_API_KEY` with the secret key from Google AI Studio.
4. Trigger a fresh deploy.
5. Test a short task in the site's workspace.

The API key must remain private. Do not paste it into ChatGPT or public GitHub files.
