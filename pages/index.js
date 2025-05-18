import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const impactTypeColors = {
  Retard: 'warning',
  Suppression: 'danger',
  Information: 'primary',
  Modification: 'info',
};

export default function Home() {
  const [trafficInfos, setTrafficInfos] = useState([]);
  const [newsPosts, setNewsPosts] = useState([]);

  useEffect(() => {
    const savedTrafficInfos = localStorage.getItem('trafficInfos');
    if (savedTrafficInfos) {
      setTrafficInfos(JSON.parse(savedTrafficInfos));
    }
    const savedNews = localStorage.getItem('newsPosts');
    if (savedNews) {
      setNewsPosts(JSON.parse(savedNews));
    }
  }, []);

  const recentNews = newsPosts.slice(0, 3);

  return (
    <>
      <header className="mastheader">
        <div className="container-fluid">
          <div className="d-flex align-items-center py-2">
            <div className="mastheader-logo">
              <Link href="/" className="d-block">
                <Image 
                  src="/images/logo-ter-mobigo.svg"
                  alt="SNCF" 
                  width={280}
                  height={80}
                  priority
                />
              </Link>
            </div>
            <nav className="mastheader-menu flex-grow-1">
              <ul className="nav justify-content-end align-items-center">
                <li className="nav-item">
                  <Link href="/" className="nav-link active">
                    Accueil
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/horaires-par-gares" className="nav-link">
                    Horaires
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/actualites" className="nav-link">
                    Actualités
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/prochains-departs" className="nav-link">
                    Prochains Départs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/abonnements-et-billets" className="nav-link">
                    Abonnements et Billets
                  </Link>
                </li>
                <li className="nav-item ms-3">
                  <Link href="/login" className="btn btn-primary">
                    Se connecter
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="main-container bg-light">
        <div className="container py-5">
          <div className="row mb-5">
            <div className="col-12 text-center">
              <h1 className="display-4 text-primary">Bienvenue sur le site TER Bourgogne - Franche-Comté</h1>
              <p className="text-muted lead">Site en cours de développement</p>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-lg-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-header bg-white border-bottom">
                  <h2 className="h5 mb-0">
                    <span className="material-icons align-middle me-2">info</span>
                    Infos Trafic
                  </h2>
                </div>
                <div className="card-body">
                  {trafficInfos.length === 0 ? (
                    <p className="card-text">Aucune info trafic disponible actuellement.</p>
                  ) : (
                    <div className="list-group list-group-flush">
                      {trafficInfos.map(info => (
                        <div key={info.id} className="list-group-item border-0 px-0">
                          <div className="d-flex align-items-center mb-2">
                            <span className={`badge bg-${impactTypeColors[info.impactType]} me-2`}>
                              {info.impactType}
                            </span>
                            <h3 className="h6 mb-0">{info.title}</h3>
                          </div>
                          <p className="text-sm mb-1 text-muted">
                            {info.startDate || '-'} {info.endDate ? `à ${info.endDate}` : ''}
                          </p>
                          <p className="mb-2">{info.description}</p>
                          <p className="mb-0 small">
                            <strong>Horaires impactés:</strong> {info.impactedTrains.length === 0 ? '-' : info.impactedTrains.join(', ')}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-header bg-white border-bottom">
                  <h2 className="h5 mb-0">
                    <span className="material-icons align-middle me-2">article</span>
                    Dernières actualités
                  </h2>
                </div>
                <div className="card-body">
                  {recentNews.length === 0 ? (
                    <p className="card-text">Aucune actualité disponible.</p>
                  ) : (
                    <div className="list-group list-group-flush">
                      {recentNews.map(post => (
                        <Link 
                          key={post.id} 
                          href={`/actualites/${post.id}`} 
                          className="list-group-item border-0 px-0 text-decoration-none"
                        >
                          <h3 className="h6 mb-1 text-primary">{post.title}</h3>
                          <small className="text-muted d-block mb-2">{new Date(post.date).toLocaleDateString()}</small>
                          <p className="mb-0 text-dark">{post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 text-end">
                    <Link href="/actualites" className="btn btn-outline-primary">
                      Voir toutes les actualités
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
