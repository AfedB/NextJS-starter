import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({ message: 'Déconnexion réussie' });
  
  response.cookies.set({
    name: 'auth_token',
    value: '',
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });
  
  return response;
}