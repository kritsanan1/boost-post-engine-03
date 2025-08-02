import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PostData {
  content: string;
  platforms: string[];
  mediaUrls: string[];
  scheduleDate?: string;
  profileKey?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Create Supabase client for user authentication
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Get user from authorization header
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !userData.user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userId = userData.user.id;
    const { content, platforms, mediaUrls, scheduleDate, profileKey }: PostData = await req.json();

    // Validate required fields
    if (!content || !platforms || platforms.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Content and platforms are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase service client for database operations
    const supabaseService = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    // Get platform IDs from the platforms table
    const { data: platformData, error: platformError } = await supabaseService
      .from('platforms')
      .select('id, name')
      .in('name', platforms.map(p => p.toLowerCase()));

    if (platformError) {
      console.error('Platform lookup error:', platformError);
      return new Response(
        JSON.stringify({ error: 'Failed to lookup platforms' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // If no platforms found, use the first platform ID as fallback
    const platformId = platformData && platformData.length > 0 ? platformData[0].id : '550e8400-e29b-41d4-a716-446655440000';

    const postStatus = scheduleDate ? 'scheduled' : 'draft';
    const scheduledFor = scheduleDate ? new Date(scheduleDate).toISOString() : null;

    // Save post to database first
    const { data: postData, error: postError } = await supabaseService
      .from('posts')
      .insert({
        user_id: userId,
        platform_id: platformId,
        content,
        media_urls: mediaUrls,
        status: postStatus,
        scheduled_for: scheduledFor,
        profile_key: profileKey,
        ai_optimized: false,
        engagement_score: 0,
        reach: 0,
        impressions: 0,
        clicks: 0
      })
      .select('id')
      .single();

    if (postError) {
      console.error('Database insert error:', postError);
      return new Response(
        JSON.stringify({ error: 'Failed to save post to database' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Prepare Ayrshare API request
    const ayrshareApiKey = Deno.env.get('AYRSHARE_API_KEY');
    if (!ayrshareApiKey) {
      return new Response(
        JSON.stringify({ error: 'Ayrshare API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Map platform names to Ayrshare platform identifiers
    const platformMap: { [key: string]: string } = {
      'twitter': 'twitter',
      'facebook': 'facebook',
      'instagram': 'instagram',
      'linkedin': 'linkedin',
      'tiktok': 'tiktok',
      'pinterest': 'pinterest',
      'snapchat': 'snapchat'
    };

    const ayrsharePayload: any = {
      post: content,
      platforms: platforms.map(p => platformMap[p.toLowerCase()]).filter(Boolean),
    };

    // Add media URLs if provided
    if (mediaUrls && mediaUrls.length > 0) {
      ayrsharePayload.mediaUrls = mediaUrls;
    }

    // Add profile key if provided
    if (profileKey) {
      ayrsharePayload.profileKey = profileKey;
    }

    // Add schedule date if provided
    if (scheduleDate) {
      ayrsharePayload.scheduleDate = new Date(scheduleDate).toISOString();
    }

    console.log('Ayrshare payload:', JSON.stringify(ayrsharePayload, null, 2));

    // Call Ayrshare API
    const ayrshareResponse = await fetch('https://app.ayrshare.com/api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ayrshareApiKey}`
      },
      body: JSON.stringify(ayrsharePayload)
    });

    const ayrshareResult = await ayrshareResponse.json();
    console.log('Ayrshare response:', JSON.stringify(ayrshareResult, null, 2));

    if (!ayrshareResponse.ok) {
      // Update post status to failed
      await supabaseService
        .from('posts')
        .update({ 
          status: 'failed',
          error_message: ayrshareResult.message || 'Failed to schedule post'
        })
        .eq('id', postData.id);

      return new Response(
        JSON.stringify({ 
          error: 'Failed to schedule post with Ayrshare',
          details: ayrshareResult 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update post with Ayrshare response
    const updateData: any = {
      ayrshare_post_id: ayrshareResult.id,
      status: scheduleDate ? 'scheduled' : 'published'
    };

    await supabaseService
      .from('posts')
      .update(updateData)
      .eq('id', postData.id);

    return new Response(
      JSON.stringify({
        success: true,
        postId: postData.id,
        ayrshareId: ayrshareResult.id,
        message: scheduleDate ? 'Post scheduled successfully' : 'Post published successfully',
        ayrshareResult
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in create-post function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});