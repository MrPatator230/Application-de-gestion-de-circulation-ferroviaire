import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { getAllSchedules, updateSchedule } from '../utils/scheduleUtils';
import { useTrackAssignments } from '../hooks/useTrackAssignments';
import modalStyles from './modal.module.css';

export default function GestionHoraires() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const { trackAssignments, updateTrackAssignment } = useTrackAssignments();
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setSchedules(getAllSchedules());
    setLoading(false);
  }, []);

  const openModal = (schedule) => {
    setSelectedSchedule(schedule);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedSchedule(null);
    setShowModal(false);
  };

  const handleChange = (scheduleId, stationName, value) => {
    const schedule = schedules.find(s => s.id === scheduleId);
    if (!schedule) return;

    if (stationName === schedule.departureStation || stationName === schedule.arrivalStation) {
      const newSchedule = { ...schedule, track: value };
      updateSchedule(scheduleId, newSchedule);
      setSchedules(prev =>
        prev.map(s => (s.id === scheduleId ? newSchedule : s))
      );
    }

    updateTrackAssignment(scheduleId, stationName, value);
  };

  const handleReset = () => {
    schedules.forEach(schedule => {
      updateSchedule(schedule.id, { delayMinutes: 0, isCancelled: false });
    });
    setSchedules(getAllSchedules());
  };

  const handleGlobalUpdate = async () => {
    setSending(true);
    setMessage(null);
    try {
      const response = await fetch('/api/updateTrackAssignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trackAssignments),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour des quais');
      }
      setMessage({ type: 'success', text: 'Attributions des quais envoyées avec succès.' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setSending(false);
    }
  };

  if (loading) return <Layout><p>Chargement...</p></Layout>;

  return (
    <Layout>
      <div className="container py-4">
        <h1>Gestion des Horaires</h1>
        <button className="btn btn-danger mb-3" onClick={handleReset}>
          Remettre à zéro retards et suppressions
        </button>
        <button
          className="btn btn-primary mb-3 ms-3"
          onClick={handleGlobalUpdate}
          disabled={sending}
        >
          {sending ? (
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          ) : null}
          Envoyer au Serveur
        </button>
        {message && (
          <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
            {message.text}
          </div>
        )}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Train</th>
              <th>Départ</th>
              <th>Arrivée</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map(schedule => (
              <tr key={schedule.id} style={schedule.isCancelled ? { textDecoration: 'line-through', color: 'red' } : {}}>
                <td>{schedule.trainNumber}</td>
                <td>{schedule.departureStation}</td>
                <td>{schedule.arrivalStation}</td>
                <td>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => openModal(schedule)}
                  >
                    <i className="icons-edit me-2"></i>
                    Modifier les arrêts
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && selectedSchedule && (
          <div className={modalStyles.modalBackdrop}>
            <div className={modalStyles.modal}>
              <div className={modalStyles.modalHeader}>
                <h5 className={modalStyles.modalTitle}>
                  Modification des quais - Train {selectedSchedule.trainNumber}
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className={modalStyles.modalBody}>
                <div className="mb-3">
                  <label className="form-label">
                    <i className="icons-departure me-2"></i>
                    Départ: {selectedSchedule.departureStation}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={trackAssignments[selectedSchedule.id]?.[selectedSchedule.departureStation] || ''}
                    onChange={e => handleChange(selectedSchedule.id, selectedSchedule.departureStation, e.target.value)}
                    placeholder="Quai"
                  />
                </div>

                {selectedSchedule.servedStations && selectedSchedule.servedStations.map((station, idx) => {
                  const stationName = typeof station === 'object' ? station.name : station;
                  return (
                    <div className="mb-3" key={`${selectedSchedule.id}-station-${idx}`}>
                      <label className="form-label">
                        <i className="icons-clock me-2"></i>
                        Arrêt: {stationName}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={trackAssignments[selectedSchedule.id]?.[stationName] || ''}
                        onChange={e => handleChange(selectedSchedule.id, stationName, e.target.value)}
                        placeholder="Quai"
                      />
                    </div>
                  );
                })}

                <div className="mb-3">
                  <label className="form-label">
                    <i className="icons-arrival me-2"></i>
                    Arrivée: {selectedSchedule.arrivalStation}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={trackAssignments[selectedSchedule.id]?.[selectedSchedule.arrivalStation] || ''}
                    onChange={e => handleChange(selectedSchedule.id, selectedSchedule.arrivalStation, e.target.value)}
                    placeholder="Quai"
                  />
                </div>
              </div>
              <div className={modalStyles.modalFooter}>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={closeModal}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .container {
          max-width: 900px;
        }
        .form-label {
          font-weight: 600;
        }
      `}</style>
    </Layout>
  );
}
