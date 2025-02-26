require('dotenv').config();
const { Client } = require('pg');

// Vérifiez que l'URL est correctement chargée
console.log("URL de connexion:", process.env.DATABASE_URL);

// Créez le client avec des paramètres explicites si nécessaire
const client = new Client({
  host: 'aws-0-eu-west-3.pooler.supabase.com',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'pxpyywffavjfjilxqqam', // Remplacez par votre mot de passe réel
  ssl: { rejectUnauthorized: false } // Important pour Supabase
});

async function testConnection() {
  try {
    await client.connect();
    console.log('Connexion réussie à la base de données');
    const result = await client.query('SELECT NOW()');
    console.log('Résultat de la requête:', result.rows[0]);
  } catch (err) {
    console.error('Erreur de connexion:', err);
  } finally {
    await client.end();
  }
}

testConnection();