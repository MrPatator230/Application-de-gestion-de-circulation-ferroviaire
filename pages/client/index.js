import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../_app';
import { useRouter } from 'next/router';

export default function Client() {
  const { logout } = useContext(AuthContext);
  const router = useRouter();
  const [reservations, setReservations] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');

  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null;

  useEffect(() => {
    if (username) {
      const allReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
      const userReservations = allReservations.filter(r => r.username === username);
      setReservations(userReservations);
    }
  }, [username]);

  const handleDeleteAccount = () => {
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

  const handleCancelReservation = (id) => {
    if (confirm('Voulez-vous annuler cette réservation ?')) {
      let allReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
      allReservations = allReservations.filter(r => r.id !== id);
      localStorage.setItem('reservations', JSON.stringify(allReservations));
      setReservations(reservations.filter(r => r.id !== id));
    }
  };

  const now = new Date();

  const upcomingReservations = reservations.filter(r => new Date(r.date) >= now);
  const pastReservations = reservations.filter(r => new Date(r.date) < now);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <nav
        style={{
          width: '250px',
          backgroundColor: '#007bff',
          color: 'white',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          maxHeight: '100vh',
        }}
      >
        <h3>Espace Client</h3>
        <ul style={{ listStyle: 'none', padding: 0, flexGrow: 1 }}>
          <li style={{ marginBottom: '1rem' }}>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Tableau de bord</a>
          </li>
          <li style={{ marginBottom: '1rem' }}>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`btn w-100 mb-2 ${activeTab === 'upcoming' ? 'btn-light text-primary' : 'btn-primary text-white'}`}
            >
              Prochaines Réservations
            </button>
          </li>
          <li style={{ marginBottom: '1rem' }}>
            <button
              onClick={() => setActiveTab('past')}
              className={`btn w-100 mb-2 ${activeTab === 'past' ? 'btn-light text-primary' : 'btn-primary text-white'}`}
            >
              Réservations Passées
            </button>
          </li>
          <li style={{ marginBottom: '1rem' }}>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Mes abonnements</a>
          </li>
        </ul>
        <button onClick={handleDeleteAccount} style={{ marginBottom: '0.5rem', backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '0.5rem' }}>
          Supprimer mon compte
        </button>
        <button onClick={handleLogout} style={{ backgroundColor: '#6c757d', color: 'white', border: 'none', padding: '0.5rem' }}>
          Se déconnecter
        </button>
      </nav>

      {/* Main content */}
      <main style={{ flexGrow: 1, padding: '1rem' }}>
        <h1>Bienvenue dans votre espace client</h1>
        <p>Utilisez le menu à gauche pour naviguer dans votre espace.</p>

        {activeTab === 'upcoming' && (
          <section>
            <h2>Prochaines Réservations</h2>
            {upcomingReservations.length === 0 ? (
              <p>Vous n'avez aucune réservation à venir.</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {upcomingReservations.map((res) => (
                  <li key={res.id} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '5px' }}>
                    <p><strong>{res.typeName}</strong> ({res.category}) - {res.price} €</p>
                    <p>Date de réservation : {new Date(res.date).toLocaleString()}</p>
                    <button onClick={() => handleCancelReservation(res.id)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '0.5rem' }}>
                      Annuler la réservation
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button
              className="btn btn-primary mt-3"
              onClick={() => router.push('/abonnements-et-billets')}
            >
              Acheter un ticket
            </button>
          </section>
        )}

        {activeTab === 'past' && (
          <section>
            <h2>Réservations Passées</h2>
            {pastReservations.length === 0 ? (
              <p>Vous n'avez aucune réservation passée.</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {pastReservations.map((res) => (
                  <li key={res.id} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '5px' }}>
                    <p><strong>{res.typeName}</strong> ({res.category}) - {res.price} €</p>
                    <p>Date de réservation : {new Date(res.date).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
