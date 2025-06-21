import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@/lib/openai';
import { buildPrompt } from '@/lib/styles';
import { TransliterationStyle } from '@/types/transliteration';

export async function POST(req: NextRequest) {
  try {
    const { text, style, reverse = false } = await req.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required and must be a string' },
        { status: 400 }
      );
    }

    if (!style || !Object.values(TransliterationStyle).includes(style)) {
      return NextResponse.json(
        { error: 'Valid transliteration style is required' },
        { status: 400 }
      );
    }

    const systemPrompt = buildPrompt(style as TransliterationStyle, reverse);
    const userPrompt = reverse ? `Romanized: """${text}"""` : `Arabic: """${text}"""`;

    let transliteration = "";

    if (style === TransliterationStyle.SHARIASOURCE && !reverse) {
      // SHARIAsource requires a chain of two calls
      
      // First call: Apply the SHARIAsource transliteration rules
      const firstCompletion = await openai.chat.completions.create({
        model: process.env.AZURE_4_1_DEPLOYMENT || "snapsolve-gpt4.1",
        temperature: 0,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
      });

      const firstResult = firstCompletion.choices[0]?.message.content?.trim() ?? "";

      // Second call: Extract the final transliteration result
      const secondCompletion = await openai.chat.completions.create({
        model: process.env.AZURE_4_1_DEPLOYMENT || "snapsolve-gpt4.1",
        temperature: 0,
        messages: [
          { 
            role: "system", 
            content: "Extract and return only the final transliterated text from the input. Remove any explanations, formatting, or additional text. Return only the clean transliterated result." 
          },
          { 
            role: "user", 
            content: `Please extract the final transliteration result from this output: """${firstResult}"""` 
          }
        ],
      });

      transliteration = secondCompletion.choices[0]?.message.content?.trim() ?? "";
    } else {
      // Standard single call for other styles
      const completion = await openai.chat.completions.create({
        model: process.env.AZURE_4_1_DEPLOYMENT || "snapsolve-gpt4.1",
        temperature: 0,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
      });

      transliteration = completion.choices[0]?.message.content?.trim() ?? "";
    }

    return NextResponse.json({ transliteration });
  } catch (error) {
    console.error('Transliteration error:', error);
    
    if (error instanceof Error && error.message.includes('API key')) {
      return NextResponse.json(
        { error: 'Azure OpenAI API configuration error' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to transliterate text' },
      { status: 500 }
    );
  }
}