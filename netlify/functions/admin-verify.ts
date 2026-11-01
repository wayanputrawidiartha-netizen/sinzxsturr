import type { Handler, HandlerEvent } from '@netlify/functions';
import { verifyAdminToken } from './utils/auth';

export const handler: Handler = async (event: HandlerEvent) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const authResult = await verifyAdminToken(event.headers.authorization || event.headers.Authorization);

  if (!authResult.authorized) {
    return {
      statusCode: authResult.statusCode || 401,
      headers,
      body: JSON.stringify({
        authenticated: false,
        error: authResult.error || 'Autentikasi gagal.',
      }),
    };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      authenticated: true,
      user: {
        id: authResult.userId,
        email: authResult.email,
        role: authResult.role,
      },
    }),
  };
};
