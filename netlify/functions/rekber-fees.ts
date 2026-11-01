import type { Handler, HandlerEvent } from '@netlify/functions';
import { supabaseAdmin, verifyAdminToken } from './utils/auth';
import { DEFAULT_REKBER_FEES } from './utils/defaultData';
import { RekberFee } from '../../src/types';

// In-memory demo store for testing before live Supabase credentials
let demoFees: RekberFee[] = [...DEFAULT_REKBER_FEES];

export const handler: Handler = async (event: HandlerEvent) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // GET: Public read
  if (event.httpMethod === 'GET') {
    if (supabaseAdmin) {
      try {
        const { data, error } = await supabaseAdmin
          .from('rekber_fees')
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
        console.warn('Fallback to demo fees:', e);
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, data: demoFees }),
    };
  }

  // All mutations require admin verification
  const authResult = await verifyAdminToken(event.headers.authorization || event.headers.Authorization);
  if (!authResult.authorized) {
    return {
      statusCode: authResult.statusCode || 401,
      headers,
      body: JSON.stringify({ success: false, error: authResult.error }),
    };
  }

  // POST: Create new fee tier
  if (event.httpMethod === 'POST') {
    try {
      const payload = JSON.parse(event.body || '{}');
      const newId = payload.id || `tier-${Date.now()}`;
      const newTier: RekberFee = {
        id: newId,
        range_label: payload.range_label || 'Rp0',
        fee_label: payload.fee_label || 'Rp0',
        sort_order: Number(payload.sort_order) || (demoFees.length + 1),
        is_active: payload.is_active !== undefined ? payload.is_active : true,
        updated_at: new Date().toISOString(),
      };

      if (supabaseAdmin) {
        const { data, error } = await supabaseAdmin
          .from('rekber_fees')
          .insert(newTier)
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
          statusCode: 201,
          headers,
          body: JSON.stringify({ success: true, data }),
        };
      }

      demoFees.push(newTier);
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ success: true, data: newTier }),
      };
    } catch (err: any) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: err.message }),
      };
    }
  }

  // PUT: Update fee tier
  if (event.httpMethod === 'PUT') {
    try {
      const payload = JSON.parse(event.body || '{}');
      const targetId = payload.id;
      if (!targetId) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, error: 'ID tier tidak ditemukan.' }),
        };
      }

      if (supabaseAdmin) {
        const { data, error } = await supabaseAdmin
          .from('rekber_fees')
          .update({
            range_label: payload.range_label,
            fee_label: payload.fee_label,
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

      const idx = demoFees.findIndex((t) => t.id === targetId);
      if (idx !== -1) {
        demoFees[idx] = { ...demoFees[idx], ...payload, updated_at: new Date().toISOString() };
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true, data: demoFees[idx] }),
        };
      }

      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ success: false, error: 'Tier tidak ditemukan.' }),
      };
    } catch (err: any) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: err.message }),
      };
    }
  }

  // DELETE: Delete fee tier
  if (event.httpMethod === 'DELETE') {
    try {
      const id = event.queryStringParameters?.id || JSON.parse(event.body || '{}').id;
      if (!id) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, error: 'ID tier diperlukan.' }),
        };
      }

      if (supabaseAdmin) {
        const { error } = await supabaseAdmin
          .from('rekber_fees')
          .delete()
          .eq('id', id);

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
          body: JSON.stringify({ success: true, message: 'Tarif berhasil dihapus.' }),
        };
      }

      demoFees = demoFees.filter((t) => t.id !== id);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Tarif berhasil dihapus.' }),
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
