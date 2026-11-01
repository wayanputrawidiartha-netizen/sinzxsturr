import type { Handler, HandlerEvent } from '@netlify/functions';
import { supabaseAdmin, verifyAdminToken } from './utils/auth';
import { DEFAULT_FAQS } from './utils/defaultData';
import { FaqItem } from '../../src/types';

let demoFaqs: FaqItem[] = [...DEFAULT_FAQS];

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
          .from('faqs')
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
        console.warn('Fallback to demo faqs:', e);
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, data: demoFaqs }),
    };
  }

  // Mutations require admin verification
  const authResult = await verifyAdminToken(event.headers.authorization || event.headers.Authorization);
  if (!authResult.authorized) {
    return {
      statusCode: authResult.statusCode || 401,
      headers,
      body: JSON.stringify({ success: false, error: authResult.error }),
    };
  }

  // POST: Create FAQ
  if (event.httpMethod === 'POST') {
    try {
      const payload = JSON.parse(event.body || '{}');
      const newFaq: FaqItem = {
        id: payload.id || `faq-${Date.now()}`,
        question: payload.question || 'Pertanyaan baru',
        answer: payload.answer || 'Jawaban',
        sort_order: Number(payload.sort_order) || (demoFaqs.length + 1),
        is_active: payload.is_active !== undefined ? payload.is_active : true,
        updated_at: new Date().toISOString(),
      };

      if (supabaseAdmin) {
        const { data, error } = await supabaseAdmin
          .from('faqs')
          .insert(newFaq)
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

      demoFaqs.push(newFaq);
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ success: true, data: newFaq }),
      };
    } catch (err: any) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: err.message }),
      };
    }
  }

  // PUT: Update FAQ
  if (event.httpMethod === 'PUT') {
    try {
      const payload = JSON.parse(event.body || '{}');
      const targetId = payload.id;
      if (!targetId) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, error: 'ID FAQ diperlukan.' }),
        };
      }

      if (supabaseAdmin) {
        const { data, error } = await supabaseAdmin
          .from('faqs')
          .update({
            question: payload.question,
            answer: payload.answer,
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

      const idx = demoFaqs.findIndex((f) => f.id === targetId);
      if (idx !== -1) {
        demoFaqs[idx] = { ...demoFaqs[idx], ...payload, updated_at: new Date().toISOString() };
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true, data: demoFaqs[idx] }),
        };
      }

      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ success: false, error: 'FAQ tidak ditemukan.' }),
      };
    } catch (err: any) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: err.message }),
      };
    }
  }

  // DELETE: Delete FAQ
  if (event.httpMethod === 'DELETE') {
    try {
      const id = event.queryStringParameters?.id || JSON.parse(event.body || '{}').id;
      if (!id) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, error: 'ID FAQ diperlukan.' }),
        };
      }

      if (supabaseAdmin) {
        const { error } = await supabaseAdmin
          .from('faqs')
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
          body: JSON.stringify({ success: true, message: 'FAQ berhasil dihapus.' }),
        };
      }

      demoFaqs = demoFaqs.filter((f) => f.id !== id);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'FAQ berhasil dihapus.' }),
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
