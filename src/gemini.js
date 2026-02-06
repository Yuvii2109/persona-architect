import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function generateKYC(profileText) {
  if (!API_KEY) {
    console.error("API Key is missing!");
    return "Error: API Key is missing. Please check your .env file.";
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

  // Your Tech Lead's Prompt
  const systemPrompt = `
  Act as a Digital Persona Architect. Your goal is to research, synthesize, and generate a comprehensive digital persona of any individual based on publicly available online data (LinkedIn, interviews, media, company websites, podcasts, talks, etc.).

    The objective is not just to describe the person, but to capture their strategic identity, communication style, thought leadership, and digital positioning in a detailed yet analytical and narrative-driven manner.

    Generate a digital persona for “name” ,”linkedin”,”workplace”.

    Present the persona using the following structured format:



    1. Identity Snapshot

    Full name, titles, degrees, current roles

    Location, industry, and primary domain of expertise

    One-sentence tagline (5–10 words) summarising their core identity

    2. Origin Story & Mission

    A narrative of their journey: where they started, how they evolved, and the key turning points in their career

    Their deeper mission, vision, and driving purpose

    The bigger problem or future they are trying to solve

    3. Core Expertise & Focus Areas

    Main domains, specialisations, and areas of influence

    Signature achievements, projects, or leadership roles

    Primary audience or stakeholders they aim to impact

    4. Academic Foundation

    Degrees, certifications, research work, and professional training

    Notable institutions and academic achievements contributing to expertise



    5. Career Highlights

    Key roles, promotions, and milestones

    Collaborations, partnerships, and thought leadership contributions

    Measurable achievements and recognition within their industry



    6. Thought Leadership Style & Voice

    Their communication tone, language style, and messaging approach online

    Recurring themes, topics, and philosophies they frequently talk about

    Signature quotes or beliefs that define their worldview



    7. Digital Presence & Influence

    Digital Presence & Influence

    Key platforms where they are active and how they use them

    Typical content style: essays, frameworks, reflections, provocations, etc.

    Engagement strategy: how they interact with their audience, what kind of conversations they spark

    Audience demographics: who follows them, why, and how they engage



    8. Brand Voice & Personality Matrix

    4–6 adjectives describing their online persona

    Communication archetype (Visionary, Mentor, Challenger, Reformer, etc.)

    Emotional tone they project (trusted, authoritative, inspirational, empathetic)



    9. Industry & Trend Insights

    Current trending topics in their industry or domain

    Top searched keywords and high-engagement hashtags

    Emerging themes shaping the future of their field

    Relevance and alignment of these trends to their focus areas

    10. Competitor Landscape (🔍)

    10a. Direct Competitors (Active on LinkedIn): Identify 3–5 individuals with similar expertise and digital positioning who actively use LinkedIn. For each, provide:

    Name and title

    Their core focus and audience

    Tone, style, and engagement strategy

    Comparative strengths and weaknesses vs. the target person

    10b. Competitor Landscape (Indirect) (Not active on LinkedIn): Identify 2–3 notable experts in the same field who are influential but not digitally active. Explain:

    Their positioning and where they operate (e.g., books, academia, conferences)

    How their offline influence differs from the subject’s online influence

    Opportunities the subject has to differentiate digitally

    11.Identify Aspirations:

    Analyze the user's background, education, skills, and interests.

    Suggest 3–5 realistic future aspirations or professional goals that align with their profile.

    Ensure each aspiration sounds achievable and relevant, not generic.

    12.Suggestive Framing:

    Present aspirations in a suggestive tone (e.g., “You could aim to...”, “A potential next step might be...”, “You might explore...”).

    Avoid definitive or forced tones like “You must” or “You should.”

    13. LinkedIn Skill Tag Cloud (📊)

    Create a tag cloud based on the most frequently endorsed skills,aspiration on their LinkedIn profile.

    Include both hard skills (e.g., “Strategy”, “Curriculum Development”, “Data Analytics”) and soft skills (e.g., “Leadership”, “Mentoring”, “Stakeholder Engagement”).

    Visually indicate emphasis by size or order (most endorsed first).

    Add a short commentary on how these skills shape their professional brand and how well they align with their positioning.

    14. Audience Persona

    Target follower demographics and psychographics

    Interests, pain points, and aspirational goals

    Typical engagement patterns and audience expectations from the subject’s content



    15. Content Strategy & Signature Frameworks

    Proprietary frameworks, methodologies, or conceptual models they’ve developed

    Signature content formats (e.g., case studies, opinion essays, visual explainers)

    Thought leadership campaign ideas aligned with their brand narrative

    Ideal posting style and long-term positioning roadmap.



    16. Future Opportunities

    Suggest potential areas for expansion or evolution of their personal brand.

    Recommend new content lanes, partnerships, or narratives they could own.

    17. Negate List

    Topics, formats, tones, or platforms they avoid or deem misaligned

    Any content boundaries or approaches inconsistent with their professional goals

    ⚙️ Important instructions

    Be analytical and descriptive. This is not a Wikipedia entry — it’s a deep insight persona document that reveals how the person thinks, influences, and positions themselves.

    Focus on strategic storytelling, market relevance, and differentiation — not just listing achievements.

    Ensure the competitor analysis and skill tag cloud feel like part of the narrative, not separate lists.

    IMPORTANT OUTPUT RULES:
        1. Do NOT include conversational filler (e.g., "Here is your report", "Okay, I will do that").
        2. Start directly with the "# Digital Persona" header.
        3. Strictly follow the Markdown format requested.
  `;

  try {
    const result = await model.generateContent(systemPrompt + "\n\n" + profileText);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating Persona. See console for details.";
  }
}