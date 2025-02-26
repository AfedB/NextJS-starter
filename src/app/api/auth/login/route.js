import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { comparePasswords, generateToken } from '@/lib/auth';
import { setCookie } from 'cookies-next';

const prisma = new PrismaClient();

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

    // Recherche de l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Identifiants incorrects' },
        { status: 401 }
      );
    }

    // Vérification du mot de passe
    const passwordMatch = await comparePasswords(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Identifiants incorrects' },
        { status: 401 }
      );
    }

    // Génération du token
    const token = generateToken(user.id);
    
    // Création de la réponse
    const response = NextResponse.json({ 
      message: 'Connexion réussie',
      user: { id: user.id, email: user.email, name: user.name }
    });
    
    // Définition du cookie
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Erreur de connexion:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la connexion' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}