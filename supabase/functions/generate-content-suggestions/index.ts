import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, tone, platform, contentType } = await req.json();

    console.log('Generating content suggestions for:', { prompt, tone, platform, contentType });

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const systemPrompt = `You are an expert social media content creator. Generate engaging, platform-specific content suggestions.

Platform: ${platform || 'general'}
Tone: ${tone || 'professional'}
Content Type: ${contentType || 'post'}

Rules:
- Keep suggestions concise and engaging
- Include relevant hashtags where appropriate
- Optimize for the specific platform
- Match the requested tone
- Provide 3 different variations
- Each suggestion should be complete and ready to post

Return response as JSON with this structure:
{
  "suggestions": [
    {
      "content": "Full post content with hashtags",
      "explanation": "Why this works well"
    }
  ]
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('AI response:', aiResponse);

    // Try to parse as JSON, fallback to plain text
    let suggestions;
    try {
      const parsed = JSON.parse(aiResponse);
      suggestions = parsed.suggestions || [{ content: aiResponse, explanation: "AI-generated content" }];
    } catch {
      suggestions = [{ content: aiResponse, explanation: "AI-generated content" }];
    }

    // Store suggestions in database
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization');
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user } } = await supabase.auth.getUser(token);
      
      if (user) {
        for (const suggestion of suggestions) {
          await supabase.from('ai_suggestions').insert({
            user_id: user.id,
            suggestion_type: 'content_generation',
            original_content: prompt,
            suggested_content: suggestion.content,
            confidence_score: 0.85,
            is_applied: false
          });
        }
      }
    }

    return new Response(JSON.stringify({ suggestions }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error generating content suggestions:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      suggestions: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});