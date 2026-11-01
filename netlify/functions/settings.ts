import type { Handler, HandlerEvent } from '@netlify/functions';
import { supabaseAdmin, verifyAdminToken } from './utils/auth';
import { DEFAULT_SETTINGS } from './utils/defaultData';

export const handler: Handler = async (event: HandlerEvent) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // GET: Public read website settings
  if (event.httpMethod === 'GET') {
    if (supabaseAdmin) {
      try {
        const { data, error } = await supabaseAdmin
          .from('website_settings')
          .select('*')
          .eq('id', 'general')
          .single();

        if (data && !error) {
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ success: true, data }),
          };
        }
      } catch (e) {
        console.warn('Fallback to default settings on Supabase error:', e);
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, data: DEFAULT_SETTINGS }),
    };
  }

  // PUT: Admin update website settings
  if (event.httpMethod === 'PUT') {
    const authResult = await verifyAdminToken(event.headers.authorization || event.headers.Authorization);
    if (!authResult.authorized) {
      return {
        statusCode: authResult.statusCode || 401,
        headers,
        body: JSON.stringify({ success: false, error: authResult.error }),
      };
    }

    try {
      const payload = JSON.parse(event.body || '{}');

      if (supabaseAdmin) {
        const { data, error } = await supabaseAdmin
          .from('website_settings')
          .upsert({
            id: 'general',
            brand_name: payload.brand_name || DEFAULT_SETTINGS.brand_name,
            whatsapp_number: payload.whatsapp_number || DEFAULT_SETTINGS.whatsapp_number,
            whatsapp_channel_url: payload.whatsapp_channel_url || DEFAULT_SETTINGS.whatsapp_channel_url,
            tiktok_url: payload.tiktok_url || DEFAULT_SETTINGS.tiktok_url,
            hero_headline: payload.hero_headline || DEFAULT_SETTINGS.hero_headline,
            hero_subheadline: payload.hero_subheadline || DEFAULT_SETTINGS.hero_subheadline,
            banner_image: payload.banner_image || DEFAULT_SETTINGS.banner_image,
            logo_image: payload.logo_image || DEFAULT_SETTINGS.logo_image,
            updated_at: new Date().toISOString(),
          })
          .select()
          .single();

        if (error) {
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ success: false, error: error.message }),
          };
        }

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true, data }),
        };
      }

      // If in demo mode without Supabase connection yet
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: { ...DEFAULT_SETTINGS, ...payload, updated_at: new Date().toISOString() },
          demo: true,
        }),
      };
    } catch (err: any) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: err.message || 'Invalid JSON payload' }),
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ success: false, error: 'Method not allowed' }),
  };
};
