import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialisation du client Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Utilisez la clé de service pour les opérations admin
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request) {
  try {
    const { email, password, name } = await request.json();

    // Validation basique
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    // Inscription de l'utilisateur avec Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        name: name || '',
      },
      email_confirm: true, // Option pour confirmer automatiquement l'email
    });

    if (error) {
      // Gestion des erreurs spécifiques
      if (error.message.includes('already registered')) {
        return NextResponse.json(
          { error: 'Email déjà utilisé' },
          { status: 400 }
        );
      }
      
      throw error;
    }

    // Ne pas inclure de données sensibles dans la réponse
    const { user } = data;
    
    return NextResponse.json({ 
      user: {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || '',
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Erreur d\'inscription:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'inscription' },
      { status: 500 }
    );
  }
}