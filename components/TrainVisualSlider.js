import { useState, useEffect } from 'react';

export default function TrainVisualSlider({ trainName, rollingStockFileName }) {
  const [materielsRoulants, setMaterielsRoulants] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const savedMateriels = localStorage.getItem('materielsRoulants');
    if (savedMateriels) {
      const parsedMateriels = JSON.parse(savedMateriels);
      setMaterielsRoulants(parsedMateriels);
    }
  }, []);

  const materiel = materielsRoulants.find(m => m.imageName === rollingStockFileName) || materielsRoulants[0];
  
  if (!materiel || materielsRoulants.length === 0) {
    return (
      <div className="train-visual-placeholder">
        <span className="material-icons">train</span>
        <p>Image du train non disponible</p>
      </div>
    );
  }

  const handlePrevClick = () => {
    setCurrentImageIndex(current => (current > 0 ? current - 1 : 0));
  };

  const handleNextClick = () => {
    const nextIndex = currentImageIndex + 1;
    if (nextIndex < materielsRoulants.length) {
      setCurrentImageIndex(nextIndex);
    }
  };

  return (
    <div className="train-visual-slider">
      <div className="train-visual-container">
        <button 
          className="nav-button prev"
          onClick={handlePrevClick}
          disabled={currentImageIndex === 0}
        >
          <span className="material-icons">chevron_left</span>
        </button>

        <div className="train-visual-wrapper">
          <img 
            src={materiel.imageData} 
            alt={`Train ${trainName}`}
            className="train-visual-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/train-placeholder.png';
            }}
          />
          <div className="train-info-overlay">
            <div className="train-name">{trainName}</div>
            <div className="materiel-name">{materiel.imageName}</div>
          </div>
        </div>

        <button 
          className="nav-button next"
          onClick={handleNextClick}
          disabled={currentImageIndex === materielsRoulants.length - 1}
        >
          <span className="material-icons">chevron_right</span>
        </button>
      </div>

      <style jsx>{`
        .train-visual-slider {
          position: relative;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 8px;
          overflow: hidden;
        }

        .train-visual-container {
          position: relative;
          width: 100%;
          padding-top: 56.25%; /* 16:9 Aspect Ratio */
          display: flex;
          align-items: center;
        }

        .train-visual-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .train-visual-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .train-info-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 102, 0.8);
          color: white;
          padding: 0.75rem;
        }

        .train-name {
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 0.25rem;
        }

        .materiel-name {
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 2;
          background: rgba(0, 0, 102, 0.6);
          border: none;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .nav-button:hover {
          background: rgba(0, 0, 102, 0.8);
        }

        .nav-button:disabled {
          background: rgba(0, 0, 102, 0.3);
          cursor: not-allowed;
        }

        .nav-button.prev {
          left: 1rem;
        }

        .nav-button.next {
          right: 1rem;
        }

        .material-icons {
          font-size: 24px;
        }

        @media (max-width: 768px) {
          .nav-button {
            width: 32px;
            height: 32px;
          }

          .material-icons {
            font-size: 20px;
          }

          .train-info-overlay {
            padding: 0.5rem;
          }

          .train-name {
            font-size: 1rem;
          }

          .materiel-name {
            font-size: 0.8rem;
          }
        }
        
        .train-visual-placeholder {
          width: 100%;
          height: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #f8f9fa;
          border-radius: 8px;
          color: #666;
        }

        .train-visual-placeholder .material-icons {
          font-size: 48px;
          margin-bottom: 1rem;
          color: #000066;
        }
      `}</style>
    </div>
  );
}
