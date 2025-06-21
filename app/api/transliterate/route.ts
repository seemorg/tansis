import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@/lib/openai';
import { buildPrompt, getAllStyles } from '@/lib/styles';
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
      // SHARIAsource with retry logic and regex cleanup
      const temperatures = [0, 0.3, 0.7];
      let result = "";
      
      for (const temperature of temperatures) {
        const completion = await openai.chat.completions.create({
          model: process.env.AZURE_4_1_DEPLOYMENT || "snapsolve-gpt4.1",
          temperature,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
        });

        result = completion.choices[0]?.message.content?.trim() ?? "";
        
        // If we get a non-empty result, break out of the loop
        if (result.length > 0) {
          break;
        }
      }
      
      // Remove asterisks used for italicization in the output
      transliteration = result.replace(/\*/g, '');
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

export async function GET() {
  const styles = getAllStyles();
  
  return NextResponse.json({
    message: "Arabic Transliteration API",
    version: "1.0.0",
    endpoints: {
      "POST /api/transliterate": {
        description: "Transliterate Arabic text to Latin script",
        body: {
          text: "string (required) - Arabic text to transliterate",
          style: "string (required) - Transliteration style",
          reverse: "boolean (optional) - Convert Latin to Arabic, default: false"
        },
        response: {
          transliteration: "string - The transliterated text"
        }
      },
      "POST /api/transliterate/batch": {
        description: "Batch transliterate multiple texts",
        body: {
          texts: "array of strings (required) - Arabic texts to transliterate",
          style: "string (required) - Transliteration style",
          reverse: "boolean (optional) - Convert Latin to Arabic, default: false"
        },
        response: {
          results: "array of objects with text and transliteration fields"
        }
      }
    },
    availableStyles: styles,
    examples: {
      single: {
        url: "POST /api/transliterate",
        body: {
          text: "السلام عليكم",
          style: "IJMES"
        }
      },
      batch: {
        url: "POST /api/transliterate/batch", 
        body: {
          texts: ["السلام عليكم", "مرحبا"],
          style: "IJMES"
        }
      }
    }
  });
}