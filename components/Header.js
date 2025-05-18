import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../pages/_app';

export default function Header() {
  const { isAuthenticated, role, logout } = useContext(AuthContext);

  return (
    <header className="bg-white py-4 shadow-md mb-8">
      <nav className="container mx-auto flex justify-between items-center px-4">
        <h2 className="text-2xl font-semibold text-gray-800">TER Bourgogne - Franche-Comté</h2>
        <div className="space-x-4">
          {!isAuthenticated ? (
            <>
              <Link href="/" legacyBehavior>
                <a className="text-gray-700 hover:text-green-700 font-medium">Accueil</a>
              </Link>
              <Link href="/login" legacyBehavior>
                <a className="px-3 py-1 border border-green-700 text-green-700 rounded hover:bg-green-700 hover:text-white transition">Se connecter</a>
              </Link>
              <Link href="/horaires-par-gares" legacyBehavior>
                <a className="px-3 py-1 border border-gray-400 text-gray-600 rounded hover:bg-gray-200 transition">Horaires</a>
              </Link>
            </>
          ) : (
            <>
              <Link href={`/${role}`} legacyBehavior>
                <a className="text-gray-700 hover:text-green-700 font-medium">Dashboard</a>
              </Link>
              <Link href="/horaires-par-gares" legacyBehavior>
                <a className="text-gray-700 hover:text-green-700 font-medium">Horaires</a>
              </Link>
              <button
                onClick={logout}
                className="px-3 py-1 border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white transition"
              >
                Déconnexion
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
