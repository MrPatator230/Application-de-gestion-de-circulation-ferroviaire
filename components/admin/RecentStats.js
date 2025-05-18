import { motion } from 'framer-motion';

export default function RecentStats({ stats }) {
  return (
    <div className="sncf-card">
      <div className="sncf-card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Statistiques Récentes</h5>
        <div className="dropdown">
          <button className="btn btn-link text-muted p-0" type="button" data-bs-toggle="dropdown">
            <span className="material-icons">more_vert</span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li><button className="dropdown-item">Aujourd'hui</button></li>
            <li><button className="dropdown-item">Cette semaine</button></li>
            <li><button className="dropdown-item">Ce mois</button></li>
          </ul>
        </div>
      </div>
      <div className="sncf-card-body">
        <div className="row g-4">
          {stats.map((stat, index) => (
            <div key={index} className="col-md-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 rounded-3 bg-light"
              >
                <div className="d-flex align-items-center mb-2">
                  <span className={`material-icons me-2 text-${stat.color}`}>{stat.icon}</span>
                  <h6 className="mb-0">{stat.title}</h6>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="h4 mb-0">{stat.value}</div>
                  {stat.change && (
                    <div className={`small ${stat.change > 0 ? 'text-success' : 'text-danger'}`}>
                      <span className="material-icons me-1" style={{ fontSize: '1rem' }}>
                        {stat.change > 0 ? 'trending_up' : 'trending_down'}
                      </span>
                      {Math.abs(stat.change)}%
                    </div>
                  )}
                </div>
                {stat.subtitle && (
                  <div className="text-muted small mt-1">{stat.subtitle}</div>
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
