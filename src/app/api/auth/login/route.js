import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

// Initialisation du client Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validation basique
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    // Connexion avec Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Gestion des erreurs d'authentification
      return NextResponse.json(
        { error: 'Identifiants incorrects' },
        { status: 401 }
      );
    }

    const { session, user } = data;

    // Création de la réponse
    const response = NextResponse.json({ 
      message: 'Connexion réussie',
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.user_metadata?.name || '' 
      }
    });
    
    // Définition du cookie de session Supabase
    // Notez que Supabase gère déjà les cookies de session, mais nous pouvons
    // également définir notre propre cookie si nécessaire
    response.cookies.set({
      name: 'sb-auth-token',
      value: session.access_token,
      httpOnly: true,
      maxAge: session.expires_in, // Durée de validité du token
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Erreur de connexion:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la connexion' },
      { status: 500 }
    );
  }
}