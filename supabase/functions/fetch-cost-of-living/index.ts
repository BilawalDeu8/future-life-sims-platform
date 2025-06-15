
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
    const { city, state } = await req.json()
    
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get API keys from Supabase secrets
    const { data: secrets } = await supabase
      .from('secrets')
      .select('*')
      .in('name', ['NUMBEO_API_KEY', 'COST_OF_LIVING_API_KEY'])

    // Try Numbeo API first
    const numbeoApiKey = secrets?.find(s => s.name === 'NUMBEO_API_KEY')?.value
    
    if (numbeoApiKey) {
      try {
        const numbeoResponse = await fetch(
          `https://www.numbeo.com/api/indices?api_key=${numbeoApiKey}&query=${encodeURIComponent(city + ', ' + state)}`
        )

        if (numbeoResponse.ok) {
          const numbeoData = await numbeoResponse.json()
          
          return new Response(
            JSON.stringify({
              city,
              state,
              housingCostIndex: numbeoData.rent_index || 100,
              groceryCostIndex: numbeoData.groceries_index || 100,
              transportationCostIndex: numbeoData.local_purchasing_power_index || 100,
              overallCostIndex: numbeoData.cost_of_living_index || 100,
              averageRent1BR: Math.round((numbeoData.rent_index || 100) * 15), // Estimated
              averageRent2BR: Math.round((numbeoData.rent_index || 100) * 20),
              medianHomePrice: Math.round((numbeoData.property_price_index || 100) * 4000),
            }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 200 
            }
          )
        }
      } catch (error) {
        console.log('Numbeo API failed, using fallback:', error)
      }
    }

    // Fallback data
    const baseCosts: { [key: string]: any } = {
      'san francisco': { housing: 180, grocery: 115, transport: 120, overall: 150, rent1br: 3500, rent2br: 4800, homePrice: 1200000 },
      'new york': { housing: 160, grocery: 110, transport: 115, overall: 140, rent1br: 3200, rent2br: 4200, homePrice: 800000 },
      'austin': { housing: 110, grocery: 95, transport: 95, overall: 105, rent1br: 1800, rent2br: 2400, homePrice: 450000 },
      'denver': { housing: 105, grocery: 100, transport: 100, overall: 103, rent1br: 1600, rent2br: 2100, homePrice: 420000 },
      'minneapolis': { housing: 95, grocery: 98, transport: 95, overall: 97, rent1br: 1400, rent2br: 1800, homePrice: 320000 },
    }

    const cityKey = city.toLowerCase()
    const data = baseCosts[cityKey] || baseCosts['minneapolis']

    return new Response(
      JSON.stringify({
        city,
        state,
        housingCostIndex: data.housing,
        groceryCostIndex: data.grocery,
        transportationCostIndex: data.transport,
        overallCostIndex: data.overall,
        averageRent1BR: data.rent1br,
        averageRent2BR: data.rent2br,
        medianHomePrice: data.homePrice,
      }),
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
