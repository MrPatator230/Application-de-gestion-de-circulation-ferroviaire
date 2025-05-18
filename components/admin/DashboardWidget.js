import { motion } from 'framer-motion';

export default function DashboardWidget({ title, value, icon, color = 'primary', onClick }) {
  const colors = {
    primary: 'bg-primary text-white',
    success: 'bg-success text-white',
    info: 'bg-info text-white',
    warning: 'bg-warning text-dark',
    danger: 'bg-danger text-white'
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`sncf-card cursor-pointer ${onClick ? 'hover:shadow-lg' : ''}`}
      onClick={onClick}
    >
      <div className="sncf-card-body p-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <div className="text-muted small text-uppercase mb-1">{title}</div>
            <div className="h3 mb-0 fw-bold">{value}</div>
          </div>
          <div className={`rounded-circle p-3 ${colors[color]}`}>
            <span className="material-icons" style={{ fontSize: '2rem' }}>
              {icon}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
