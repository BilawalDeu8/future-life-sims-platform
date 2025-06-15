
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { userId } = await req.json()
    
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get user's personalization profile
    const { data: profile, error } = await supabase
      .from('personalization_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error || !profile) {
      return new Response(
        JSON.stringify([]),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    // Generate personalized recommendations based on profile
    const recommendations = []

    // Scenario recommendations based on preferences
    if (profile.work_life_balance_weight > 70) {
      recommendations.push({
        type: 'scenario',
        id: 'remote-consultant',
        title: 'Explore Digital Nomad Lifestyle',
        reason: 'High work-life balance priority',
        priority: 1
      })
    }

    if (profile.salary_weight > 60) {
      recommendations.push({
        type: 'scenario',
        id: 'corporate-finance',
        title: 'Financial Analyst Path',
        reason: 'High salary priority',
        priority: 1
      })
    }

    // Feature recommendations based on engagement
    if (profile.engagement_level < 20) {
      recommendations.push({
        type: 'feature',
        id: 'day-in-life',
        title: 'Try Day in Life Simulator',
        reason: 'Great way to start exploring',
        priority: 2
      })
    }

    if (profile.completed_scenarios?.length > 2) {
      recommendations.push({
        type: 'feature',
        id: 'community',
        title: 'Connect with Mentors',
        reason: 'Ready for real-world insights',
        priority: 1
      })
    }

    // Learning recommendations
    if (profile.growth_weight > 50) {
      recommendations.push({
        type: 'learning',
        id: 'skill-development',
        title: 'Skill Development Plan',
        reason: 'Growth-focused career path',
        priority: 2
      })
    }

    return new Response(
      JSON.stringify(recommendations),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
