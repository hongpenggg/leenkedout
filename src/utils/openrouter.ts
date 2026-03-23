// OpenRouter API integration
// Note: This uses the native fetch API instead of the SDK due to SDK compatibility issues

const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function translateToLinkedInLingo(text: string): Promise<string> {
  if (!apiKey || apiKey === 'your_openrouter_api_key_here') {
    // Fallback mock translation when no API key is provided
    return generateMockTranslation(text);
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'LeenkedOUT',
      },
      body: JSON.stringify({
        model: 'openrouter/free',
        messages: [
          {
            role: 'system',
            content: `You are a translator that converts plain English into exaggerated LinkedIn corporate buzzword language ("LinkedIn Lingo"). 
            
Transform simple statements into self-aggrandizing, jargon-filled corporate speak with phrases like:
- "synergy", "paradigm shift", "leverage", "optimize", "scalable"
- "cross-functional alignment", "stakeholder buy-in", "low-hanging fruit"
- "thought leadership", "disruptive innovation", "growth mindset"
- "circling back", "moving the needle", "boiling the ocean"
- "deep dive", "actionable insights", "core competencies"

Make it sound pretentious, overly professional, and filled with corporate clichés. Keep the core meaning but make it sound like someone trying too hard on LinkedIn.`
          },
          {
            role: 'user',
            content: `Translate this to LinkedIn Lingo: "${text}"`
          }
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || generateMockTranslation(text);
  } catch (error) {
    console.error('OpenRouter API error:', error);
    return generateMockTranslation(text);
  }
}

export async function generateHumbleBragPost(topic: string, _tone: string): Promise<string> {
  if (!apiKey || apiKey === 'your_openrouter_api_key_here') {
    return generateMockHumbleBrag(topic);
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'LeenkedOUT',
      },
      body: JSON.stringify({
        model: 'openrouter/free',
        messages: [
          {
            role: 'system',
            content: `You are a LinkedIn post generator that creates "humble brag" posts - posts that appear humble but are actually self-promoting.
            
Create posts that:
- Start with "So humbled to..." or "Incredibly grateful to..."
- Mention impressive achievements disguised as gratitude
- Include corporate buzzwords and hashtags
- End with a faux-inspirational message
- Use emojis strategically (🚀, 💡, 🙏, ✨)

Make it sound authentic to the LinkedIn ecosystem - self-congratulatory but pretending to be modest.`
          },
          {
            role: 'user',
            content: `Generate a humble brag LinkedIn post about: "${topic}"`
          }
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || generateMockHumbleBrag(topic);
  } catch (error) {
    console.error('OpenRouter API error:', error);
    return generateMockHumbleBrag(topic);
  }
}

// Mock translation function for fallback
function generateMockTranslation(_text: string): string {
  const buzzwords = [
    'leveraging cross-functional synergies',
    'optimizing stakeholder alignment',
    'driving paradigm shifts',
    'unlocking scalable solutions',
    'pioneering disruptive innovation',
    'maximizing core competencies',
    'cultivating thought leadership',
    'accelerating growth trajectories',
    'streamlining operational efficiencies',
    'fostering collaborative ecosystems'
  ];
  
  const randomBuzzword = buzzwords[Math.floor(Math.random() * buzzwords.length)];
  
  return `After much introspection and strategic alignment with my core values, I've decided to embark on a journey of ${randomBuzzword} while maintaining an agile posture in this dynamic landscape. This isn't just a change—it's a transformational pivot toward unprecedented value creation. 🚀`;
}

// Mock humble brag generator for fallback
function generateMockHumbleBrag(topic: string): string {
  const templates = [
    `So humbled to share that I've been recognized as a Top Voice in ${topic}! 🏆\n\nIt's not about the accolades, but about the incredible community of disruptors and visionaries I get to learn from every day. When we leverage our collective synergies, there's no limit to what we can achieve.\n\nRemember: Success is a journey, not a destination. Keep grinding! 💪✨\n\n#Blessed #GrowthMindset #${topic.replace(/\s+/g, '')} #ThoughtLeadership`,
    
    `Incredibly grateful to announce that I've just ${topic}! 🎉\n\nThey say luck is when preparation meets opportunity, but I'd argue it's about showing up every single day with a growth mindset and a willingness to disrupt the status quo.\n\nTo everyone who supported me on this journey—thank you. This win is ours. 🙏\n\n#Humbled #SuccessMindset #Grateful #${topic.replace(/\s+/g, '')}`,
    
    `Just wanted to take a moment to reflect on ${topic}. 💭\n\nPeople ask me "What's your secret?" The truth is, there is no secret. It's about radical transparency, extreme ownership, and never settling for "good enough."\n\nIf I can do it, so can you. The only thing standing between you and your goals is your mindset. 🚀\n\n#MondayMotivation #Leadership #${topic.replace(/\s+/g, '')} #Inspiration`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}

export async function decodeLInkedInJunk(text: string): Promise<string> {
  if (!apiKey || apiKey === 'your_openrouter_api_key_here') {
    return generateMockDecode(text);
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'LeenkedOUT',
      },
      body: JSON.stringify({
        model: 'openrouter/free',
        messages: [
          {
            role: 'system',
            content: `You are a no-bullshit translator. Your job is to take LinkedIn corporate jargon and rewrite it as short, direct, plain English.

Rules:
- Strip all buzzwords, filler phrases, and corporate speak
- Be blunt and honest about what is actually being said
- Keep it SHORT — one or two sentences max
- No emojis, no hashtags, no fluff
- If the original text is humble-bragging, call it what it is
- If it's vague nonsense, say so plainly

Examples:
- "I'm leaning into my North Star to disrupt the status quo" → "I'm doing something different."
- "Incredibly humbled to announce I've joined [Company] as VP of Synergy" → "I got a new job."
- "Excited to share that I'll be speaking at [Event] to 10,000+ leaders" → "I'm giving a talk."
- "After a period of reflection, I'm pivoting to explore new opportunities" → "I got fired or quit."`,
          },
          {
            role: 'user',
            content: `Decode this LinkedIn post to plain English: "${text}"`,
          },
        ],
      }),
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    return data.choices?.[0]?.message?.content || generateMockDecode(text);
  } catch (error) {
    console.error('OpenRouter API error:', error);
    return generateMockDecode(text);
  }
}

function generateMockDecode(_text: string): string {
  const decoded = [
    "I got a promotion. I'm very pleased with myself.",
    "I quit my job. I'm calling it a 'journey' so it sounds intentional.",
    "I got fired. It was unexpected.",
    "I'm networking because I need something from you.",
    "I did something normal and I'm pretending it's profound.",
    "I want you to think I'm important.",
  ];
  return decoded[Math.floor(Math.random() * decoded.length)];
}
