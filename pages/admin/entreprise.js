import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../_app';
import { SettingsContext } from '../../contexts/SettingsContext';
import Sidebar from '../../components/Sidebar';

export default function Entreprise() {
  const { role, isAuthenticated } = useContext(AuthContext);
  const {
    companyName,
    setCompanyName,
    companySlogan,
    setCompanySlogan,
    companyDescription,
    setCompanyDescription,
    primaryColor,
    setPrimaryColor,
    secondaryColor,
    setSecondaryColor,
    appName,
    setAppName,
  } = useContext(SettingsContext);

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || role !== 'admin') {
      router.push('/login');
    }
  }, [isAuthenticated, role, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const settings = {
      companyName,
      companySlogan,
      companyDescription,
      primaryColor,
      secondaryColor,
      appName,
    };
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });
      if (response.ok) {
        alert('Paramètres enregistrés avec succès !');
      } else {
        alert('Erreur lors de l\'enregistrement des paramètres.');
      }
    } catch (error) {
      alert('Erreur lors de l\'enregistrement des paramètres.');
    }
  };

  return (
    <div id="wrapper" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column flex-grow-1">
        <div id="content" className="container mt-4 flex-grow-1">
          <h1>Informations sur l'entreprise</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="companyName" className="form-label">Nom de l'entreprise</label>
              <input
                type="text"
                id="companyName"
                className="form-control"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="companySlogan" className="form-label">Slogan</label>
              <input
                type="text"
                id="companySlogan"
                className="form-control"
                value={companySlogan}
                onChange={(e) => setCompanySlogan(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="companyDescription" className="form-label">Description</label>
              <textarea
                id="companyDescription"
                className="form-control"
                rows="4"
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
                required
              />
            </div>
            <h2>Paramètres du site</h2>
            <div className="mb-3">
              <label htmlFor="primaryColor" className="form-label">Couleur principale</label>
              <input
                type="color"
                id="primaryColor"
                className="form-control form-control-color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                title="Choisissez la couleur principale"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="secondaryColor" className="form-label">Couleur secondaire</label>
              <input
                type="color"
                id="secondaryColor"
                className="form-control form-control-color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                title="Choisissez la couleur secondaire"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="appName" className="form-label">Nom de l'application</label>
              <input
                type="text"
                id="appName"
                className="form-control"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Enregistrer</button>
          </form>
        </div>
      </div>
    </div>
  );
}
