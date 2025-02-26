import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(request) {
  // Vérifier si le chemin commence par /dashboard ou d'autres routes protégées
  if (
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/profile')
  ) {
    // Récupérer le token depuis les cookies
    const token = request.cookies.get('auth_token')?.value;
    
    // Vérifier si le token est valide
    if (!token || !verifyToken(token)) {
      // Rediriger vers la page de connexion
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

// Configure les chemins sur lesquels le middleware s'applique
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};