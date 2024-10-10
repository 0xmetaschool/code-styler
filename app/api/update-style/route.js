import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {
  try {
    const { code, designDescription, previousCss } = await req.json();

    const messages = [
      {
        role: "system",
        content: `When given HTML code, existing CSS, and a design update description:
        1. Update the existing CSS based on the new design description, only update the styles that are needed, do not add any new styles, keep everything as close to the original as possible, you don't have to fix the exisiting css according to the new design description, just update the styles that are needed.
        2. Provide only the updated CSS code without any surrounding tags, backticks, or language identifiers
        3. Do not include any explanation or markdown formatting - just the pure CSS code`
      },
      {
        role: "user",
        content: `Here is the existing CSS:\n\n${previousCss}\n\nUpdate this CSS for the following HTML, based on this new design description without adding or removing any styles: ${designDescription}\n\nHTML Code: ${code}`
      }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages,
    });

    let styleContent = completion.choices[0].message.content.trim();
    
    // Remove <style> tags if present
    styleContent = styleContent.replace(/<\/?style>/g, '').trim();

    // Combine the original HTML with the updated styled CSS
    const styledCode = `
      <style>
      ${styleContent}
      </style>
      ${code}
    `;

    return NextResponse.json({ 
      styledCode,
      cssOnly: styleContent
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Error processing your request' }, { status: 500 });
  }
}