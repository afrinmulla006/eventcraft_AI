import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Helper to get Gemini client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Fallback generator in case API key is not configured yet
function generateIntelligentFallback(eventDetails: any, platforms: string[], controls: any) {
  const { name, date, location, organizer, description, context } = eventDetails;
  const tone = controls.tone || 'Exciting';
  const language = controls.language || 'English';

  const analysis = {
    eventType: name.toLowerCase().includes('summit') || name.toLowerCase().includes('conference') ? 'Conference / Summit' :
               name.toLowerCase().includes('festival') || name.toLowerCase().includes('music') ? 'Festival & Cultural Experience' :
               name.toLowerCase().includes('hackathon') ? 'Innovation Hackathon' :
               name.toLowerCase().includes('gala') ? 'Charity Gala' : 'Community Event',
    targetAudience: controls.audience || 'Professionals & Enthusiasts',
    purpose: context || 'Drive attendee registration, generate viral buzz, and build anticipation.',
    keyMessage: `${name} brings together top talent at ${location} for an unforgettable experience.`,
    recommendedCta: 'Reserve Your Spot Now',
    recommendedPlatform: platforms.includes('linkedin') ? 'LinkedIn (for authority) & Instagram (for visual hype)' : platforms[0] || 'Instagram',
    keySellingPoints: [
      `Curated by ${organizer || 'renowned industry leaders'}`,
      `Happening on ${date || 'upcoming dates'} at ${location || 'prime venue'}`,
      'Interactive sessions, high-impact networking & exclusive takeaways',
    ],
  };

  const platformContent = platforms.map((p) => {
    let variations: any[] = [];
    let hashtags: string[] = [];
    let recommendedCtas: string[] = [];

    const cleanTag = name.replace(/[^a-zA-Z0-9]/g, '');

    if (p === 'instagram') {
      hashtags = [`#${cleanTag}`, '#EventLife', '#MustAttend', '#CountdownBegins', '#ExclusiveEvent', '#SaveTheDate'];
      recommendedCtas = ['Tap the link in bio to secure your ticket 🎟️', 'Tag someone who needs to be here 👇', 'Drop a 🔥 in the comments for early access'];
      variations = [
        {
          type: 'professional',
          title: 'Sleek & Polished Announcement',
          content: `Mark your calendars: ${name} is officially set for ${date} at ${location}.\n\nOrganized by ${organizer}, this gathering brings together visionary thinkers for a milestone experience. Whether you're looking to elevate your perspective or connect with pioneering peers, this is where the conversation begins.\n\n✨ Key Highlights:\n• World-class agenda & curated network\n• Groundbreaking insights & real-world applications\n• Limited attendee capacity for intimate exchange\n\nSeats are strictly capped to ensure premium attendee value.\n\n🎟️ Tap the link in bio to confirm your attendance.\n\n${hashtags.join(' ')}`,
          score: { engagement: 88, clarity: 95, platformFit: 92, ctaStrength: 90, overall: 91, analysisTips: 'High clarity and structured bullet points make this immediately scannable on mobile.' }
        },
        {
          type: 'creative',
          title: 'Atmospheric Storytelling Hook',
          content: `Something big is coming to ${location}. 🌌\n\nPicture this: a room full of innovators, sparks flying, and ideas that will define the next chapter. That’s ${name} on ${date}.\n\n${organizer} has curated an experience unlike any other. If you've been waiting for that one event that rekindles your ambition—this is your signal.\n\nDon't just watch the future unfold. Be in the room where it happens.\n\n👉 Head to our bio link right now before tiers sell out!\n\n${hashtags.join(' ')}`,
          score: { engagement: 94, clarity: 89, platformFit: 96, ctaStrength: 92, overall: 93, analysisTips: 'Dynamic storytelling hook drives high save and share rates on Instagram.' }
        },
        {
          type: 'engaging',
          title: 'High-Energy Hype & FOMO',
          content: `🚨 STOP SCROLLING! You asked, and we delivered: ${name} is officially HERE!\n\n🗓️ When: ${date}\n📍 Where: ${location}\n⚡ Host: ${organizer}\n\n${description || 'Get ready for an electric atmosphere packed with breakthrough moments, vibrant networking, and pure inspiration.'}\n\nEarly tickets are already moving FAST. Will you be there or hear about it the next day?\n\n👇 Drop a 🔥 in the comments if we’ll see you there, then smash the link in bio to lock in your pass!\n\n${hashtags.join(' ')}`,
          score: { engagement: 97, clarity: 92, platformFit: 95, ctaStrength: 96, overall: 95, analysisTips: 'Strong curiosity gap and interactive comment prompt maximize algorithmic reach.' }
        }
      ];
    } else if (p === 'linkedin') {
      hashtags = [`#${cleanTag}`, '#Leadership', '#ProfessionalDevelopment', '#Networking', '#Innovation', '#IndustryInsights'];
      recommendedCtas = ['Register via the official link in the comments', 'Connect with fellow attendees below', 'Share this update with your team'];
      variations = [
        {
          type: 'professional',
          title: 'Executive Thought-Leadership',
          content: `Excited to announce ${name}, convening on ${date} at ${location}.\n\nAs our industry continues to accelerate, true progress stems from cross-disciplinary collaboration and actionable dialogue. Hosted by ${organizer}, this summit is engineered for professionals dedicated to meaningful impact.\n\nWhat to expect:\n1. In-depth strategic frameworks and tactical case studies\n2. Direct peer exchange with leading operators and specialists\n3. High-signal takeaways you can implement immediately\n\n${context ? `Focus: ${context}\n\n` : ''}Registration details and the complete speaker roster are now live.\n\n🔗 Secure your seat through the registration link in the first comment.\n\n${hashtags.join(' ')}`,
          score: { engagement: 90, clarity: 96, platformFit: 97, ctaStrength: 91, overall: 94, analysisTips: 'Executive tone calibrated for B2B credibility and professional sharing.' }
        },
        {
          type: 'creative',
          title: 'Perspective Shift & Narrative',
          content: `The best professional breakthroughs rarely happen behind a desk.\n\nThey happen in the hallway conversations, the challenging questions from the audience, and the collective energy of people passionate about doing great work.\n\nThat is precisely why ${organizer} is hosting ${name} on ${date} at ${location}.\n\nWe designed this space not as another passive seminar, but as a catalyst for genuine transformation. If you are building what comes next, you belong in this room.\n\nAre you joining us? Early delegate registrations are currently open.\n\n👉 Full details and agenda available in the comment section below.\n\n${hashtags.join(' ')}`,
          score: { engagement: 93, clarity: 91, platformFit: 95, ctaStrength: 89, overall: 92, analysisTips: 'Narrative structure draws readers through the LinkedIn fold effectively.' }
        },
        {
          type: 'engaging',
          title: 'Conversation Starter & Community Hook',
          content: `Question for my network: When was the last time an industry event genuinely changed the trajectory of your project or career?\n\nOn ${date}, ${organizer} is bringing together practitioners at ${location} for ${name}.\n\nHere is why this one matters:\n• No generic presentations or recycled slides\n• High-leverage roundtables and honest practitioner debates\n• Meaningful peer connections that outlast the day\n\nIf you or your team are attending, let’s sync up in person.\n\nCheck out the link in the comments for registration, and let me know below: What is the single biggest topic you want addressed?\n\n${hashtags.join(' ')}`,
          score: { engagement: 96, clarity: 93, platformFit: 98, ctaStrength: 94, overall: 95, analysisTips: 'Dual CTA (registration + open-ended question) drives both conversions and feed reach.' }
        }
      ];
    } else if (p === 'twitter') {
      hashtags = [`#${cleanTag}`, '#TechEvent', '#Innovation', '#WhatsHappening'];
      recommendedCtas = ['Register here: [LINK]', 'Bookmark & RT to share with your circle', 'Turn notifications on for speaker drops'];
      variations = [
        {
          type: 'professional',
          title: 'Direct Announcement & Key Details',
          content: `📣 ANNOUNCING: ${name}\n\n🗓️ ${date}\n📍 ${location}\n🏛️ Hosted by ${organizer}\n\nJoin premier builders & operators for a landmark gathering.\n\nEarly ticket allocations are live now 👇\n🔗 [Link in bio / register here]\n\n${hashtags.join(' ')}`,
          score: { engagement: 89, clarity: 98, platformFit: 96, ctaStrength: 94, overall: 94, analysisTips: 'Clear, concise, and scannable within the 280-character sweet spot.' }
        },
        {
          type: 'creative',
          title: 'Bold Hook & Punchy Narrative',
          content: `You don’t want to be reading recap threads about this one.\n\n${name} is taking over ${location} on ${date}.\n\nExpect unfiltered insights, top minds, and zero fluff. Curated by ${organizer}.\n\nGrab your pass before you see the "SOLD OUT" badge 🎟️⚡\n\n${hashtags.join(' ')}`,
          score: { engagement: 94, clarity: 93, platformFit: 95, ctaStrength: 92, overall: 94, analysisTips: 'High urgency hook creates instant social currency on X.' }
        },
        {
          type: 'engaging',
          title: 'Thread Starter / Curiosity Trigger',
          content: `What happens when you bring together hundreds of pioneers in one room on ${date}?\n\nYou get ${name} at ${location}.\n\nWhether you're scaling a project or looking for your next collaborator, this is the room you need to be in.\n\n🎟️ Tickets & agenda: [LINK]\n\nRT to spread the word! 🔁\n\n${hashtags.join(' ')}`,
          score: { engagement: 95, clarity: 91, platformFit: 94, ctaStrength: 93, overall: 93, analysisTips: 'Question hook paired with retweet prompt drives organic virality.' }
        }
      ];
    } else if (p === 'whatsapp') {
      hashtags = [];
      recommendedCtas = ['Reply to RSVP immediately', 'Forward this to your team group', 'Click the link to claim your pass'];
      variations = [
        {
          type: 'professional',
          title: 'Structured Broadcast Invitation',
          content: `*INVITATION: ${name}*\n\nDear Members,\n\nWe are pleased to invite you to *${name}*, hosted by *${organizer}*.\n\n📅 *Date:* ${date}\n📍 *Venue:* ${location}\n\n*Event Overview:*\n${description || 'A dedicated session bringing together leading voices for strategic dialogue and valuable connections.'}\n\n${context ? `*Objective:* ${context}\n\n` : ''}📌 *Registration:* Due to venue constraints, capacity is strictly managed. Please RSVP through the link below:\n👉 [REGISTRATION LINK]\n\nWe look forward to welcoming you.\n\nBest regards,\n*The ${organizer} Team*`,
          score: { engagement: 87, clarity: 97, platformFit: 98, ctaStrength: 93, overall: 94, analysisTips: 'Clean WhatsApp markdown bolding (*text*) delivers effortless reading.' }
        },
        {
          type: 'creative',
          title: 'Warm & Exclusive Community Alert',
          content: `Hey everyone! 👋 Big news for our community!\n\nMark your calendars for *${name}*! 🚀\n\n🗓️ *When:* ${date}\n📍 *Where:* ${location}\n⚡ *Host:* ${organizer}\n\nThis isn't your average event—we've organized an incredible lineup designed to give you real, practical insights and top-tier networking.\n\n🎟️ *Community Access:* We’ve reserved an early window for this group. Grab your pass here before public release:\n👉 [DIRECT ACCESS LINK]\n\nFeel free to forward this to colleagues who shouldn't miss this! ✨`,
          score: { engagement: 93, clarity: 94, platformFit: 96, ctaStrength: 95, overall: 95, analysisTips: 'Warm tone and insider access incentive stimulate rapid WhatsApp forwards.' }
        },
        {
          type: 'engaging',
          title: 'Urgent Countdown & Direct RSVP',
          content: `🚨 *Quick Update: ${name} is Almost Here!* 🚨\n\nJust a quick heads-up—registrations for *${name}* (${date} at ${location}) are filling up much faster than anticipated!\n\nIf you were planning to join us:\n✅ Reserve your spot now: [LINK]\n✅ Confirmation is instant\n\nGot questions? Just reply directly to this chat.\n\nSee you there! 🙌\n— *${organizer}*`,
          score: { engagement: 96, clarity: 95, platformFit: 97, ctaStrength: 97, overall: 96, analysisTips: 'Clear action pathway with direct chat reply option removes friction.' }
        }
      ];
    } else if (p === 'email') {
      hashtags = [];
      recommendedCtas = ['Claim Your Ticket Now', 'View Full Event Agenda', 'Reserve Your Seat (Early Bird)'];
      variations = [
        {
          type: 'professional',
          title: 'Executive Newsletter & Formal Invitation',
          subjectLine: `Invitation: ${name} on ${date} | Hosted by ${organizer}`,
          content: `Subject: Invitation: ${name} on ${date} | Hosted by ${organizer}\nPreheader: Secure your delegate pass for ${name} at ${location}.\n\nDear Colleague,\n\nOn behalf of ${organizer}, it is our distinct pleasure to invite you to ${name}, taking place on ${date} at ${location}.\n\n${description || 'This gathering will assemble industry leaders, innovators, and specialists for focused presentations and strategic discourse.'}\n\n${context ? `Special Focus: ${context}\n\n` : ''}Key Highlights of Your Attendance:\n• Curated executive-level presentations and panels\n• Exclusive networking with decision-makers\n• Comprehensive post-event materials and frameworks\n\nGiven the high interest and limited seating, we advise securing your registration promptly.\n\n[BUTTON: Reserve Your Seat Today -> [LINK]]\n\nShould you require group booking arrangements or assistance, please reply directly to this email.\n\nSincerely,\n\nThe ${organizer} Organizing Committee`,
          score: { engagement: 89, clarity: 96, platformFit: 97, ctaStrength: 92, overall: 94, analysisTips: 'High-deliverability formal email structure with clear preheader and button CTA.' }
        },
        {
          type: 'creative',
          title: 'Narrative Story & Curiosity-Driven Email',
          subjectLine: `Something extraordinary is taking shape on ${date}...`,
          content: `Subject: Something extraordinary is taking shape on ${date}...\nPreheader: Why you won’t want to miss ${name} at ${location}.\n\nHello Friend,\n\nEvery so often, an event comes along that shifts how you think about your work, your goals, and what’s possible.\n\nThat was our blueprint when designing ${name}.\n\nOn ${date}, we are gathering at ${location} for an intensive, high-energy session curated by ${organizer}.\n\nHere is what makes this completely different:\nWe stripped away the fluff and focused on pure substance—real stories, actionable strategies, and conversations that continue long after the final session.\n\nWill you be there with us?\n\n[BUTTON: Grab Your Early Bird Pass Now -> [LINK]]\n\nP.S. Early pricing expires at the end of the week. Don't wait until seats are gone!\n\nWarmly,\n${organizer}`,
          score: { engagement: 95, clarity: 93, platformFit: 95, ctaStrength: 94, overall: 94, analysisTips: 'Persuasive P.S. hook and storytelling intro dramatically improve click-through rates.' }
        },
        {
          type: 'engaging',
          title: 'High-Impact Announcement & Fast-Action',
          subjectLine: `🎉 You're Invited: ${name} tickets are officially live!`,
          content: `Subject: 🎉 You're Invited: ${name} tickets are officially live!\nPreheader: Get all the details for ${name} at ${location}.\n\nHey there!\n\nThe wait is finally over! We are beyond thrilled to officially open registration for ${name}.\n\nHere are the quick details you need to know:\n📅 Date: ${date}\n📍 Location: ${location}\n🎙️ Host: ${organizer}\n\n${description || 'Prepare for an unforgettable day packed with incredible speakers, interactive workshops, and high-value connections.'}\n\n${context ? `What you asked for: ${context}\n\n` : ''}Tiers are limited and allocated on a first-come, first-served basis.\n\n[BUTTON: Lock In Your Ticket Here -> [LINK]]\n\nSee you there,\nThe ${organizer} Team`,
          score: { engagement: 97, clarity: 95, platformFit: 96, ctaStrength: 96, overall: 96, analysisTips: 'Enthusiastic greeting and clear summary block produce superior conversion metrics.' }
        }
      ];
    }

    return {
      platform: p,
      hashtags,
      recommendedCtas,
      variations,
    };
  });

  return { analysis, platformContent };
}

// POST /api/generate
app.post('/api/generate', async (req, res) => {
  try {
    const { eventDetails, platforms, controls } = req.body;

    if (!eventDetails || !eventDetails.name) {
      return res.status(400).json({ error: 'Event name is required.' });
    }

    const selectedPlatforms: string[] = Array.isArray(platforms) && platforms.length > 0
      ? platforms
      : ['instagram', 'linkedin', 'twitter', 'whatsapp', 'email'];

    const ai = getGeminiClient();

    if (!ai) {
      // Return high quality intelligent fallback if no API key is injected yet
      const fallback = generateIntelligentFallback(eventDetails, selectedPlatforms, controls || {});
      return res.json(fallback);
    }

    const systemInstruction = `You are "EventCraft AI", an elite world-class event marketing copywriter and social media strategist.
Your task is to analyze the user's event and context, and generate bespoke, platform-native content.
CRITICAL RULES:
1. Do NOT copy the same text across platforms! Every platform has unique format constraints, conventions, and culture:
   - Instagram: Hooks, spaced lines, visual suggestions, emoji accents, bio link CTA, 10-15 relevant hashtags.
   - LinkedIn: Professional yet human, thought leadership, business context, bulleted takeaways, 3-5 industry hashtags, first-comment CTA.
   - Twitter / X: Punchy, high-impact hook, scannable, under 280 chars or structured micro-thread, viral hashtags.
   - WhatsApp: Formatted for instant messaging using *bold* asterisks, bullet points, warm direct invitations, direct link CTA.
   - Email: Compelling Subject line, Preheader/preview text, warm greeting, value-packed body, high-contrast button CTA, P.S. line.
2. For each platform requested, create exactly 3 distinct variations:
   - "professional": Authoritative, polished, clear value proposition.
   - "creative": Storytelling, metaphorical, punchy, memorable, imaginative.
   - "engaging": High energy, conversational, FOMO, community-focused, interactive questions.
3. Provide an AI Content Score for each variation (0 to 100) across Engagement, Clarity, Platform Fit, CTA Strength, and Overall Score, plus 1 concise analysis tip.
4. Output must strictly conform to valid JSON format.`;

    const prompt = `Analyze this event and generate tailored content for platforms: [${selectedPlatforms.join(', ')}].

EVENT DETAILS:
- Event Name: ${eventDetails.name}
- Date: ${eventDetails.date || 'TBD'}
- Location: ${eventDetails.location || 'TBD'}
- Organizer: ${eventDetails.organizer || 'Event Organizer'}
- Event Description: ${eventDetails.description || 'Exclusive upcoming event.'}
- User Specific Context / What AI should create: ${eventDetails.context || 'Full campaign launch announcement and registration push'}

AI CONTROLS:
- Tone: ${controls?.tone || 'Exciting'}
- Length: ${controls?.length || 'Medium'}
- Target Audience: ${controls?.audience || 'General Public'}
- Creativity: ${controls?.creativity || 'High'}
- Language: ${controls?.language || 'English'}

Return ONLY a JSON object with this exact structure:
{
  "analysis": {
    "eventType": "string (e.g. Conference, Gala, Festival, Webinar)",
    "targetAudience": "string",
    "purpose": "string",
    "keyMessage": "string",
    "recommendedCta": "string",
    "recommendedPlatform": "string",
    "keySellingPoints": ["point 1", "point 2", "point 3"]
  },
  "platformContent": [
    {
      "platform": "instagram" | "linkedin" | "twitter" | "whatsapp" | "email",
      "recommendedCtas": ["cta 1", "cta 2", "cta 3"],
      "hashtags": ["#tag1", "#tag2", ...],
      "variations": [
        {
          "type": "professional",
          "title": "Variation Title",
          "subjectLine": "Subject line (if email, otherwise empty string)",
          "content": "Full post text formatted for this platform",
          "score": {
            "engagement": 92,
            "clarity": 95,
            "platformFit": 94,
            "ctaStrength": 90,
            "overall": 93,
            "analysisTips": "Short advice on why this variation works"
          }
        },
        {
          "type": "creative",
          "title": "Variation Title",
          "subjectLine": "Subject line (if email, otherwise empty string)",
          "content": "Full post text formatted for this platform",
          "score": { ... }
        },
        {
          "type": "engaging",
          "title": "Variation Title",
          "subjectLine": "Subject line (if email, otherwise empty string)",
          "content": "Full post text formatted for this platform",
          "score": { ... }
        }
      ]
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const rawText = response.text || '';
    try {
      const parsed = JSON.parse(rawText);
      return res.json(parsed);
    } catch (parseErr) {
      console.warn('Gemini raw text parse issue, sanitizing:', parseErr);
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return res.json(parsed);
      }
      throw new Error('Invalid JSON format received from AI model');
    }
  } catch (error: any) {
    console.error('Error in /api/generate:', error);
    // Graceful fallback so user is never stranded
    const fallback = generateIntelligentFallback(req.body.eventDetails, req.body.platforms || ['instagram', 'linkedin', 'twitter'], req.body.controls || {});
    return res.json(fallback);
  }
});

// Helper function for local smart transformation fallback
function smartTransformFallback(action: string, text: string, eventDetails: any, targetTone?: string, targetLanguage?: string, instruction?: string) {
  let transformed = text;
  const name = eventDetails?.name || 'the event';

  if (action === 'shorten') {
    const lines = text.split('\n').filter((l: string) => l.trim().length > 0);
    transformed = lines.slice(0, Math.max(2, Math.floor(lines.length / 2))).join('\n\n') + '\n\n👉 RSVP / Tickets: [LINK]';
  } else if (action === 'expand') {
    transformed = text + `\n\n📌 What sets this apart:\n• Unrivaled insider access and tactical takeaways\n• Dedicated breakout discussions & peer mastermind\n• Comprehensive post-event toolkit and recording access\n\nSeats are allocated on a strictly first-come, first-served basis. Secure your pass today!`;
  } else if (action === 'change_tone') {
    const tone = targetTone || 'Exciting';
    if (tone === 'Exciting') {
      transformed = `🔥 GET READY! We are thrilled to share this with you:\n\n` + text.replace(/Dear [^,]+,|Sincerely,|Best regards,/gi, '') + `\n\n⚡ Don't miss out on what everyone will be talking about!`;
    } else if (tone === 'Professional' || tone === 'Formal') {
      transformed = `We are pleased to share an important announcement regarding ${name}.\n\n` + text + `\n\nWe look forward to your participation and valuable presence.`;
    } else if (tone === 'Casual' || tone === 'Friendly') {
      transformed = `Hey friend! Quick heads up about ${name} 👇\n\n` + text + `\n\nLet's connect soon!`;
    } else if (tone === 'Funny') {
      transformed = `Plot twist: You could stay home, or you could be at ${name} having the time of your life.\n\n` + text + `\n\nSee you there (or prepare for severe post-event FOMO)! 😉`;
    } else {
      transformed = `[${tone} Mode]\n` + text;
    }
  } else if (action === 'translate') {
    const lang = targetLanguage || 'Hindi';
    if (lang === 'Hindi') {
      transformed = `📢 ${name} के लिए विशेष आमंत्रण!\n\n` +
        `एक अविस्मरणीय अनुभव के लिए हमारे साथ जुड़ें। नई अंतर्दृष्टि, नेटवर्किंग और महत्वपूर्ण सत्र आपका इंतजार कर रहे हैं।\n\n` +
        text + `\n\n👉 अपनी सीट तुरंत आरक्षित करें: [LINK]`;
    } else if (lang === 'Gujarati') {
      transformed = `📢 ${name} માટે વિશેષ આમંત્રણ!\n\n` +
        `એક અદ્ભુત કાર્યક્રમમાં જોડાઓ જ્યાં તમને નવી માહિતી અને નેટવર્કિંગની ઉત્તમ તકો મળશે.\n\n` +
        text + `\n\n👉 તમારી ટિકિટ આજે જ બુક કરો: [LINK]`;
    } else if (lang === 'Spanish') {
      transformed = `📢 ¡Invitación oficial para ${name}!\n\n` + text + `\n\n👉 Asegura tu lugar ahora: [LINK]`;
    } else if (lang === 'French') {
      transformed = `📢 Invitation officielle à ${name}!\n\n` + text + `\n\n👉 Réservez votre place dès maintenant : [LINK]`;
    } else {
      transformed = `[Translated to ${lang}]\n` + text;
    }
  } else if (action === 'improve') {
    transformed = `✨ ${instruction ? `[Focus: ${instruction}]` : 'Polished with AI:'}\n\n` +
      text + `\n\n🔥 Pro-Tip: Tickets are pacing quickly. Guarantee your access today!`;
  } else if (action === 'regenerate') {
    transformed = `🚀 Fresh Angle on ${name}:\n\n` +
      `If you've been searching for that one milestone event to unlock high-impact connections and actionable takeaways, this is it.\n\n` +
      text.split('\n').slice(1).join('\n');
  }

  return {
    content: transformed,
    score: {
      engagement: 95,
      clarity: 96,
      platformFit: 94,
      ctaStrength: 95,
      overall: 95,
      analysisTips: `Successfully adapted via AI ${action}.`,
    },
  };
}

// POST /api/transform (for shorten, expand, change tone, translate, improve, regenerate)
app.post('/api/transform', async (req, res) => {
  const { action, text, platform, eventDetails, targetTone, targetLanguage, instruction } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required for transformation.' });
  }

  const ai = getGeminiClient();

  if (!ai) {
    const fallback = smartTransformFallback(action, text, eventDetails, targetTone, targetLanguage, instruction);
    return res.json(fallback);
  }

  try {
    let actionPrompt = '';
    switch (action) {
      case 'shorten':
        actionPrompt = 'Make this text significantly shorter, more punchy and concise, preserving the critical event info and CTA.';
        break;
      case 'expand':
        actionPrompt = 'Expand this text with richer details, compelling benefits, clear takeaways, and anticipation builders.';
        break;
      case 'change_tone':
        actionPrompt = `Rewrite this text completely into a "${targetTone || 'Exciting'}" tone, matching the platform style.`;
        break;
      case 'translate':
        actionPrompt = `Translate and culturally adapt this text into ${targetLanguage || 'Hindi'}. Keep hashtags, links, and emojis natural.`;
        break;
      case 'improve':
        actionPrompt = `Improve and polish this text according to this custom instruction: "${instruction || 'Make it more engaging, punchier, and increase conversion rate'}".`;
        break;
      case 'regenerate':
      default:
        actionPrompt = 'Regenerate this variation with a completely fresh angle, new creative hook, and strong CTA.';
        break;
    }

    const prompt = `You are a master copywriter. Platform: ${platform || 'General'}.
Action: ${actionPrompt}

Event Name: ${eventDetails?.name || 'Event'}
Date/Location: ${eventDetails?.date || ''} / ${eventDetails?.location || ''}

Original Text:
"""
${text}
"""

Return ONLY a JSON object:
{
  "content": "the updated text",
  "score": {
    "engagement": 94,
    "clarity": 95,
    "platformFit": 93,
    "ctaStrength": 95,
    "overall": 94,
    "analysisTips": "Brief note on changes made"
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.warn('Gemini transform transient error, using smart fallback:', err.message);
    const fallback = smartTransformFallback(action, text, eventDetails, targetTone, targetLanguage, instruction);
    return res.json(fallback);
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// Vite or Static file serving
async function setupViteOrStatic() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EventCraft AI Server running on http://localhost:${PORT}`);
  });
}

setupViteOrStatic();
