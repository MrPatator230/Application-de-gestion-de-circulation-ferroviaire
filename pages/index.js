import Header from '../components/Header';

export default function Home() {
  return (
    <div className="main-wrapper">
      <Header />
      <main className="main-container">
        <div className="container-fluid">
          <h1 className="sncf-title mb-4">Bienvenue sur SNCF TER Mobigo</h1>
          
          <div className="row g-4">
            <div className="col-md-6">
              <div className="sncf-card h-100">
                <div className="sncf-card-body">
                  <h2 className="h4 mb-3">Actualités</h2>
                  <p>Restez informé des dernières actualités concernant votre réseau de transport.</p>
                  <a href="/actualites" className="btn btn-primary">
                    <span className="material-icons me-2">article</span>
                    Voir les actualités
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="sncf-card h-100">
                <div className="sncf-card-body">
                  <h2 className="h4 mb-3">Horaires et Itinéraires</h2>
                  <p>Consultez les horaires et planifiez vos trajets en quelques clics.</p>
                  <a href="/verifier-horaires" className="btn btn-primary">
                    <span className="material-icons me-2">schedule</span>
                    Vérifier les horaires
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="sncf-card h-100">
                <div className="sncf-card-body">
                  <h2 className="h4 mb-3">Abonnements & Billets</h2>
                  <p>Découvrez nos offres d'abonnement et achetez vos billets en ligne.</p>
                  <a href="/abonnements-et-billets" className="btn btn-primary">
                    <span className="material-icons me-2">card_membership</span>
                    Voir les offres
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="sncf-card h-100">
                <div className="sncf-card-body">
                  <h2 className="h4 mb-3">Nos Gares</h2>
                  <p>Trouvez toutes les informations sur les gares de votre région.</p>
                  <a href="/stations" className="btn btn-primary">
                    <span className="material-icons me-2">train</span>
                    Explorer les gares
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
