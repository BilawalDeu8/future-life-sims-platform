
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
    const profileUpdate = await req.json()
    
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Upsert personalization profile
    const { data, error } = await supabase
      .from('personalization_profiles')
      .upsert({
        user_id: profileUpdate.userId,
        preferred_locations: profileUpdate.preferredLocations || [],
        career_interests: profileUpdate.careerInterests || [],
        risk_tolerance: profileUpdate.riskTolerance || 'medium',
        work_life_balance_weight: profileUpdate.workLifeBalanceWeight || 50,
        salary_weight: profileUpdate.salaryWeight || 30,
        growth_weight: profileUpdate.growthWeight || 15,
        stability_weight: profileUpdate.stabilityWeight || 5,
        engagement_level: profileUpdate.engagementLevel || 0,
        completed_scenarios: profileUpdate.completedScenarios || [],
        behavior_pattern: profileUpdate.behaviorPattern || {},
        updated_at: new Date().toISOString(),
      })

    if (error) {
      throw error
    }

    return new Response(
      JSON.stringify({ success: true, data }),
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
