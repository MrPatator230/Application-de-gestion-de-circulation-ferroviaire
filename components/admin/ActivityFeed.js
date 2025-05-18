import { motion } from 'framer-motion';

export default function ActivityFeed({ activities }) {
  return (
    <div className="sncf-card h-100">
      <div className="sncf-card-header">
        <h5 className="mb-0">Activités Récentes</h5>
      </div>
      <div className="sncf-card-body p-0">
        <div className="activity-timeline p-3">
          {activities.map((activity, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="activity-item"
            >
              <div className="activity-content">
                <div className="d-flex align-items-center mb-1">
                  <span className={`activity-icon bg-${activity.color} text-white me-3`}>
                    <span className="material-icons">{activity.icon}</span>
                  </span>
                  <div className="activity-text flex-grow-1">
                    <h6 className="mb-0">{activity.title}</h6>
                    <small className="text-muted">{activity.time}</small>
                  </div>
                </div>
                {activity.description && (
                  <p className="mb-0 ms-5 ps-1 text-muted">
                    {activity.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
