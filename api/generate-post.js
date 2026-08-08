export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, type } = req.body;
    const apiKey = process.env.GEMINI_API_KEY; // Note: NO VITE_ prefix, this is a secure server variable

    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured on server' });
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: type === 'task' ? {
          responseMimeType: 'application/json',
        } : undefined,
      })
    });

    if (!response.ok) {
      throw new Error('Failed to communicate with Gemini API');
    }

    const data = await response.json();
    return res.status(200).json({ text: data.candidates[0].content.parts[0].text });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

