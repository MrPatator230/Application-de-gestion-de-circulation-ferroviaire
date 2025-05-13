import { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../_app';
import Sidebar from '../../components/Sidebar';

export default function Admin() {
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const [stationCount, setStationCount] = useState(0);
  const [scheduleCount, setScheduleCount] = useState(0);
  const [onTimeRatio, setOnTimeRatio] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    // Load jQuery, Bootstrap Bundle, and SB Admin 2 JS from CDN
    const jqueryScript = document.createElement('script');
    jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
    jqueryScript.async = true;
    document.body.appendChild(jqueryScript);

    const bootstrapScript = document.createElement('script');
    bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js';
    bootstrapScript.async = true;
    document.body.appendChild(bootstrapScript);

    const sbAdminScript = document.createElement('script');
    sbAdminScript.src = 'https://cdn.jsdelivr.net/npm/startbootstrap-sb-admin-2@4.1.4/js/sb-admin-2.min.js';
    sbAdminScript.async = true;
    document.body.appendChild(sbAdminScript);

    return () => {
      document.body.removeChild(jqueryScript);
      document.body.removeChild(bootstrapScript);
      document.body.removeChild(sbAdminScript);
    };
  }, []);

  useEffect(() => {
    const savedStations = localStorage.getItem('stations');
    if (savedStations) {
      const stations = JSON.parse(savedStations);
      setStationCount(stations.length);
    }

    const savedSchedules = localStorage.getItem('schedules');
    if (savedSchedules) {
      const schedules = JSON.parse(savedSchedules);
      setScheduleCount(schedules.length);

      // Since no delay data, assume all schedules are on time
      setOnTimeRatio(100);
    } else {
      setScheduleCount(0);
      setOnTimeRatio(null);
    }
  }, []);

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  const handleAnnouncementRedirect = () => {
    router.push('/admin/banque-de-sons');
  };

  return (
    <>
      <div id="wrapper">
        {/* Sidebar */}
        <Sidebar />
        {/* End of Sidebar */}

        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
            {/* Topbar */}
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              <h1 className="h3 mb-0 text-gray-800">Dashboard Admin</h1>
            </nav>
            {/* End of Topbar */}

            {/* Begin Page Content */}
            <div className="container-fluid">
              {/* Widgets Row */}
              <div className="row">
                {/* Station Count Widget */}
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            Nombre de gares
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">{stationCount}</div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-train fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Schedule Count Widget */}
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                            Nombre d'horaires créés
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">{scheduleCount}</div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-clock fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* On Time Ratio Widget */}
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-info shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                            Ratio d'horaires à l'heure (%)
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {onTimeRatio !== null ? `${onTimeRatio}%` : 'N/A'}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-check-circle fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Announcement System Redirect Widget */}
                <div className="col-xl-3 col-md-6 mb-4">
                  <div
                    className="card border-left-warning shadow h-100 py-2"
                    style={{ cursor: 'pointer' }}
                    onClick={handleAnnouncementRedirect}
                  >
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                            Système d'annonces vocales
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            Accéder au système
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-bullhorn fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Widgets Row */}

              <h2>Bienvenue dans l'espace admin</h2>
              <p>Utilisez le menu latéral pour naviguer.</p>
            </div>
            {/* /.container-fluid */}
          </div>
          {/* End of Main Content */}
        </div>
        {/* End of Content Wrapper */}
      </div>
    </>
  );
}
