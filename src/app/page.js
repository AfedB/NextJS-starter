import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <RootLayout>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 sm:py-20">
        <main className="max-w-screen-lg px-4 sm:px-8 text-center">
          {/* Hero Section */}
          <section className="mb-12">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-4">
              Bienvenue sur notre application !
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Découvrez une nouvelle façon de gérer votre quotidien.
              {/* Add a real description of your app !*/}
            </p>

            {/* Conditional CTAs based on login status */}
            {session ? (
              <Link
                href="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-colors"
              >
                Accéder à mon espace
              </Link>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-colors"
                >
                  Se connecter
                </Link>
                <Link
                  href="/register"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-full transition-colors"
                >
                  S'inscrire
                </Link>
              </div>
            )}
          </section>

          {/* Features Section */}
          {!session && (
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              {/* Add real features here! */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Fonctionnalité 1
                </h3>
                <p className="text-gray-600">
                  Description de la fonctionnalité.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Fonctionnalité 2
                </h3>
                <p className="text-gray-600">
                  Description de la fonctionnalité.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Fonctionnalité 3
                </h3>
                <p className="text-gray-600">
                  Description de la fonctionnalité.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Fonctionnalité 4
                </h3>
                <p className="text-gray-600">
                  Description de la fonctionnalité.
                </p>
              </div>
            </section>
          )}
          {/* About us Section */}
          <section className="bg-gray-100 rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              À propos de nous
            </h2>
            <p className="text-gray-600">
              Nous sommes une équipe passionnée qui vise à simplifier votre vie
              quotidienne.
            </p>
          </section>
        </main>
      </div>
    </RootLayout>
  );
}

