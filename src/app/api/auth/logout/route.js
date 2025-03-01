import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

// Initialisation du client Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET() {
  try {
    // Récupérer le cookie de session
    const cookieStore = cookies();
    const supabaseAuthToken = cookieStore.get('sb-auth-token')?.value;
    
    // Créer un client Supabase avec le token d'authentification
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false
      }
    });
    
    // Déconnecter l'utilisateur dans Supabase
    if (supabaseAuthToken) {
      await supabase.auth.admin.signOut(supabaseAuthToken);
    }
    
    // Créer la réponse
    const response = NextResponse.json({ message: 'Déconnexion réussie' });
    
    // Supprimer le cookie de session
    response.cookies.set({
      name: 'sb-auth-token',
      value: '',
      httpOnly: true,
      expires: new Date(0),
      path: '/',
    });
    
    // Supprimer également l'ancien cookie auth_token pour la compatibilité
    response.cookies.set({
      name: 'auth_token',
      value: '',
      httpOnly: true,
      expires: new Date(0),
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la déconnexion' },
      { status: 500 }
    );
  }
}