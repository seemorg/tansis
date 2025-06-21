import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@/lib/openai';
import { buildPrompt } from '@/lib/styles';
import { TransliterationStyle } from '@/types/transliteration';

export async function POST(req: NextRequest) {
  try {
    const { text, style } = await req.json();

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

    const systemPrompt = buildPrompt(style as TransliterationStyle);
    const userPrompt = `Arabic: """${text}"""`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
    });

    const transliteration = completion.choices[0]?.message.content?.trim() ?? "";

    return NextResponse.json({ transliteration });
  } catch (error) {
    console.error('Transliteration error:', error);
    
    if (error instanceof Error && error.message.includes('API key')) {
      return NextResponse.json(
        { error: 'OpenAI API configuration error' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to transliterate text' },
      { status: 500 }
    );
  }
}