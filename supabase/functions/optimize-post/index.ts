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
    const { postId, content, platform } = await req.json();

    console.log('Optimizing post:', { postId, platform });

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Authorization required');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabase.auth.getUser(token);
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Get historical performance data for similar posts
    const { data: historicalPosts } = await supabase
      .from('posts')
      .select(`
        *,
        post_analytics (*)
      `)
      .eq('user_id', user.id)
      .eq('status', 'published')
      .limit(50);

    // Calculate optimization metrics
    const analytics = historicalPosts?.flatMap(post => post.post_analytics) || [];
    const avgEngagement = analytics.length > 0 
      ? analytics.reduce((sum, a) => sum + (a.likes + a.comments + a.shares), 0) / analytics.length
      : 0;

    const avgReach = analytics.length > 0
      ? analytics.reduce((sum, a) => sum + a.reach, 0) / analytics.length
      : 0;

    // Analyze content for optimization
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (openAIApiKey) {
      const systemPrompt = `You are a social media optimization expert. Analyze this content and provide optimization suggestions.

Platform: ${platform}
Current content: "${content}"

Historical performance data:
- Average engagement: ${avgEngagement}
- Average reach: ${avgReach}

Provide optimization suggestions focusing on:
1. Hashtag optimization
2. Posting time recommendations
3. Content structure improvements
4. Engagement tactics

Return response as JSON:
{
  "optimizations": [
    {
      "type": "hashtags|timing|structure|engagement",
      "suggestion": "Specific recommendation",
      "impact": "high|medium|low",
      "reason": "Why this will help"
    }
  ],
  "optimizedContent": "Improved version of the content",
  "confidence": 0.85
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
            { role: 'user', content: content }
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiResponse = data.choices[0].message.content;

        try {
          const optimizationData = JSON.parse(aiResponse);
          
          // Store optimization suggestion
          if (postId) {
            await supabase.from('ai_suggestions').insert({
              user_id: user.id,
              post_id: postId,
              suggestion_type: 'optimization',
              original_content: content,
              suggested_content: optimizationData.optimizedContent,
              confidence_score: optimizationData.confidence || 0.8,
              is_applied: false
            });
          }

          return new Response(JSON.stringify({
            success: true,
            optimizations: optimizationData.optimizations,
            optimizedContent: optimizationData.optimizedContent,
            confidence: optimizationData.confidence,
            historicalMetrics: {
              avgEngagement,
              avgReach,
              totalPosts: historicalPosts?.length || 0
            }
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });

        } catch (e) {
          console.error('Failed to parse AI response:', e);
        }
      }
    }

    // Fallback optimization based on historical data
    const basicOptimizations = [
      {
        type: "timing",
        suggestion: "Post during peak engagement hours (9-11 AM or 7-9 PM)",
        impact: "medium",
        reason: "These times typically show higher engagement rates"
      },
      {
        type: "hashtags",
        suggestion: "Use 3-5 relevant hashtags for better discoverability",
        impact: "medium",
        reason: "Optimal hashtag count for engagement without appearing spammy"
      }
    ];

    return new Response(JSON.stringify({
      success: true,
      optimizations: basicOptimizations,
      optimizedContent: content,
      confidence: 0.6,
      historicalMetrics: {
        avgEngagement,
        avgReach,
        totalPosts: historicalPosts?.length || 0
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error optimizing post:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});