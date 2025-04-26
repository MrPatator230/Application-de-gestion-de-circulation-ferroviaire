import { useContext } from 'react';
import { AuthContext } from '../_app';
import { useRouter } from 'next/router';

export default function Client() {
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  const handleDeleteAccount = () => {
    const username = localStorage.getItem('username');
    if (!username) return;

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users = users.filter(user => user.username !== username);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Votre compte a bien été supprimé');

    // Clear auth tokens and logout
    logout();
    router.push('/login');
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="container mt-4">
      <h1>Espace Client</h1>
      <p>Bienvenue dans votre espace client.</p>
      <button className="btn btn-danger me-2" onClick={handleDeleteAccount}>
        Supprimer mon compte
      </button>
      <button className="btn btn-secondary" onClick={handleLogout}>
        Se déconnecter
      </button>
    </div>
  );
}
