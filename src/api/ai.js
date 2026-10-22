import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Generate image with DALL-E 3
 */
export async function generateImage(prompt, options = {}) {
  const { size = '1024x1024', quality = 'standard', style = 'vivid' } = options;
  
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt,
    size,
    quality,
    style,
    n: 1
  });
  
  return {
    url: response.data[0].url,
    revisedPrompt: response.data[0].revised_prompt
  };
}

/**
 * Chat completion with GPT-4o
 */
export async function chatCompletion(messages, options = {}) {
  const { model = 'gpt-4o', temperature = 0.7, maxTokens = 1000 } = options;
  
  const response = await openai.chat.completions.create({
    model,
    messages,
    temperature,
    max_tokens: maxTokens
  });
  
  return {
    content: response.choices[0].message.content,
    usage: response.usage
  };
}

/**
 * Vision - analyze image
 */
export async function analyzeImage(imageUrl, prompt) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: prompt || 'Опиши это изображение подробно' },
          { type: 'image_url', image_url: { url: imageUrl } }
        ]
      }
    ],
    max_tokens: 500
  });
  
  return {
    analysis: response.choices[0].message.content
  };
}

/**
 * Generate prompt from photo (Pinterest AI feature)
 */
export async function generatePromptFromPhoto(imageUrl) {
  return analyzeImage(imageUrl, 
    'Создай детальный промпт для генерации похожего изображения на основе этого фото. ' +
    'Включи стиль, освещение, композицию, цвета, настроение. Ответ на русском.'
  );
}
