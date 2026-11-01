import type { Handler, HandlerEvent } from '@netlify/functions';
import { supabaseAdmin, verifyAdminToken } from './utils/auth';
import { DEFAULT_GAME_SERVICES } from './utils/defaultData';
import { GameService } from '../../src/types';

let demoServices: GameService[] = [...DEFAULT_GAME_SERVICES];

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

  // GET: Public read
  if (event.httpMethod === 'GET') {
    if (supabaseAdmin) {
      try {
        const { data, error } = await supabaseAdmin
          .from('game_services')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (data && !error && data.length > 0) {
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ success: true, data }),
          };
        }
      } catch (e) {
        console.warn('Fallback to demo game services:', e);
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, data: demoServices }),
    };
  }

  // Admin authentication required for modifications
  const authResult = await verifyAdminToken(event.headers.authorization || event.headers.Authorization);
  if (!authResult.authorized) {
    return {
      statusCode: authResult.statusCode || 401,
      headers,
      body: JSON.stringify({ success: false, error: authResult.error }),
    };
  }

  // PUT: Update game service
  if (event.httpMethod === 'PUT') {
    try {
      const payload = JSON.parse(event.body || '{}');
      const targetId = payload.id;
      if (!targetId) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, error: 'ID Layanan Game diperlukan.' }),
        };
      }

      if (supabaseAdmin) {
        const { data, error } = await supabaseAdmin
          .from('game_services')
          .update({
            title: payload.title,
            description: payload.description,
            speciality_notes: payload.speciality_notes,
            highlights: payload.highlights || [],
            banner_image: payload.banner_image,
            sort_order: Number(payload.sort_order),
            is_active: payload.is_active !== undefined ? payload.is_active : true,
            updated_at: new Date().toISOString(),
          })
          .eq('id', targetId)
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

      const idx = demoServices.findIndex((s) => s.id === targetId);
      if (idx !== -1) {
        demoServices[idx] = { ...demoServices[idx], ...payload, updated_at: new Date().toISOString() };
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true, data: demoServices[idx] }),
        };
      }

      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ success: false, error: 'Layanan game tidak ditemukan.' }),
      };
    } catch (err: any) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: err.message }),
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ success: false, error: 'Method not allowed' }),
  };
};
