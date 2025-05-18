import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { format, addMonths } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function VerifierHoraires() {
  const [stations, setStations] = useState([]);
  const [departureStation, setDepartureStation] = useState('');
  const [arrivalStation, setArrivalStation] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [via, setVia] = useState('');
  const [showVia, setShowVia] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Charger les stations depuis le localStorage uniquement côté client
    const savedStations = window.localStorage.getItem('stations');
    if (savedStations) {
      try {
        setStations(JSON.parse(savedStations));
      } catch (e) {
        console.error('Erreur lors du chargement des stations:', e);
        setStations([]);
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchData = {
      departureStation,
      arrivalStation,
      via: showVia ? via : null,
      departureDate,
      returnDate: returnDate || null
    };

    // Simuler une recherche d'horaires
    const mockResults = {
      aller: {
        date: searchData.departureDate,
        trains: [
          {
            id: 1,
            departure: '08:00',
            arrival: '09:30',
            duration: '1h30',
            type: 'TER',
            number: '857412',
            status: 'À l\'heure'
          },
          {
            id: 2,
            departure: '10:00',
            arrival: '11:30',
            duration: '1h30',
            type: 'TER',
            number: '857413',
            status: 'À l\'heure'
          }
        ]
      },
      retour: searchData.returnDate ? {
        date: searchData.returnDate,
        trains: [
          {
            id: 3,
            departure: '16:00',
            arrival: '17:30',
            duration: '1h30',
            type: 'TER',
            number: '857414',
            status: 'À l\'heure'
          }
        ]
      } : null
    };

    setSearchResults(mockResults);
  };

  const formatDate = (dateStr) => {
    return format(new Date(dateStr), 'EEEE d MMMM yyyy', { locale: fr });
  };

  // Calculer la date minimale (aujourd'hui) et maximale (dans 3 mois)
  const today = new Date();
  const maxDate = addMonths(today, 3);
  const minDateStr = format(today, 'yyyy-MM-dd');
  const maxDateStr = format(maxDate, 'yyyy-MM-dd');

  if (!isClient) {
    return (
      <Layout>
        <div className="py-4">
          <h1 className="sncf-title mb-4">Chargement...</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-4">
        <h1 className="sncf-title mb-4">Rechercher un horaire</h1>

        <div className="sncf-card">
          <div className="sncf-card-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-4">
                {/* Gare de départ */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">
                      <span className="material-icons align-middle me-2">place</span>
                      Gare de départ
                    </label>
                    <select 
                      className="form-select"
                      value={departureStation}
                      onChange={(e) => setDepartureStation(e.target.value)}
                      required
                    >
                      <option value="">Sélectionnez une gare</option>
                      {stations.map((station) => (
                        <option key={station.id} value={station.id}>
                          {station.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Gare d'arrivée */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">
                      <span className="material-icons align-middle me-2">place</span>
                      Gare d'arrivée
                    </label>
                    <select 
                      className="form-select"
                      value={arrivalStation}
                      onChange={(e) => setArrivalStation(e.target.value)}
                      required
                    >
                      <option value="">Sélectionnez une gare</option>
                      {stations.map((station) => (
                        <option 
                          key={station.id} 
                          value={station.id}
                          disabled={station.id === departureStation}
                        >
                          {station.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Via (optionnel) */}
                <div className="col-12">
                  <button
                    type="button"
                    className="btn btn-link text-primary p-0"
                    onClick={() => setShowVia(!showVia)}
                  >
                    <span className="material-icons align-middle me-1">
                      {showVia ? 'remove_circle' : 'add_circle'}
                    </span>
                    Via
                  </button>
                  {showVia && (
                    <div className="mt-3">
                      <select 
                        className="form-select"
                        value={via}
                        onChange={(e) => setVia(e.target.value)}
                      >
                        <option value="">Sélectionnez une gare intermédiaire</option>
                        {stations.map((station) => (
                          <option 
                            key={station.id} 
                            value={station.id}
                            disabled={
                              station.id === departureStation || 
                              station.id === arrivalStation
                            }
                          >
                            {station.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Date aller */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">
                      <span className="material-icons align-middle me-2">event</span>
                      Aller
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      min={minDateStr}
                      max={maxDateStr}
                      required
                    />
                  </div>
                </div>

                {/* Date retour (optionnel) */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">
                      <span className="material-icons align-middle me-2">event</span>
                      Retour (optionnel)
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      min={departureDate || minDateStr}
                      max={maxDateStr}
                    />
                  </div>
                </div>

                {/* Bouton de recherche */}
                <div className="col-12">
                  <button type="submit" className="btn btn-primary w-100">
                    <span className="material-icons align-middle me-2">search</span>
                    Rechercher
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {searchResults && (
          <div className="mt-4">
            {/* Résultats Aller */}
            <div className="sncf-card mb-4">
              <div className="sncf-card-header">
                <h5 className="mb-0">
                  Trains disponibles le {formatDate(searchResults.aller.date)}
                </h5>
              </div>
              <div className="sncf-card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th>N° Train</th>
                        <th>Départ</th>
                        <th>Arrivée</th>
                        <th>Durée</th>
                        <th>Type</th>
                        <th>Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults.aller.trains.map((train) => (
                        <tr key={train.id}>
                          <td>{train.number}</td>
                          <td>{train.departure}</td>
                          <td>{train.arrival}</td>
                          <td>{train.duration}</td>
                          <td>{train.type}</td>
                          <td>
                            <span className="badge bg-success">
                              {train.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Résultats Retour */}
            {searchResults.retour && (
              <div className="sncf-card">
                <div className="sncf-card-header">
                  <h5 className="mb-0">
                    Trains disponibles le {formatDate(searchResults.retour.date)}
                  </h5>
                </div>
                <div className="sncf-card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead>
                        <tr>
                          <th>N° Train</th>
                          <th>Départ</th>
                          <th>Arrivée</th>
                          <th>Durée</th>
                          <th>Type</th>
                          <th>Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchResults.retour.trains.map((train) => (
                          <tr key={train.id}>
                            <td>{train.number}</td>
                            <td>{train.departure}</td>
                            <td>{train.arrival}</td>
                            <td>{train.duration}</td>
                            <td>{train.type}</td>
                            <td>
                              <span className="badge bg-success">
                                {train.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
