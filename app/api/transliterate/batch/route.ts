import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@/lib/openai';
import { buildPrompt } from '@/lib/styles';
import { TransliterationStyle } from '@/types/transliteration';

export async function POST(req: NextRequest) {
  try {
    const { texts, style, reverse = false } = await req.json();

    if (!texts || !Array.isArray(texts) || texts.length === 0) {
      return NextResponse.json(
        { error: 'Texts array is required and must contain at least one string' },
        { status: 400 }
      );
    }

    if (texts.some(text => !text || typeof text !== 'string')) {
      return NextResponse.json(
        { error: 'All texts must be non-empty strings' },
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
    const results = [];

    for (const text of texts) {
      const userPrompt = reverse ? `Romanized: """${text}"""` : `Arabic: """${text}"""`;
      
      let transliteration = "";

      if (style === TransliterationStyle.SHARIASOURCE && !reverse) {
        const completion = await openai.chat.completions.create({
          model: process.env.AZURE_4_1_DEPLOYMENT || "snapsolve-gpt4.1",
          temperature: 0,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
        });

        const result = completion.choices[0]?.message.content?.trim() ?? "";
        transliteration = result.replace(/\*/g, '');
      } else {
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

      results.push({
        text,
        transliteration
      });
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Batch transliteration error:', error);
    
    if (error instanceof Error && error.message.includes('API key')) {
      return NextResponse.json(
        { error: 'Azure OpenAI API configuration error' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to transliterate texts' },
      { status: 500 }
    );
  }
}