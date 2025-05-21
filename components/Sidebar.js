import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { AuthContext } from '../pages/_app';
import { SettingsContext } from '../contexts/SettingsContext';
import Image from 'next/image';

export default function Sidebar() {
  const router = useRouter();
  const currentPath = router.pathname;
  const { logout } = useContext(AuthContext);
  const { companyName } = useContext(SettingsContext);
  const [isAnnouncementMenuOpen, setAnnouncementMenuOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  const toggleAnnouncementMenu = () => {
    setAnnouncementMenuOpen(!isAnnouncementMenuOpen);
  };

  return (
    <nav className="sncf-sidebar bg-white shadow-sm">
      <div className="sncf-sidebar-header">
        <Link href="/admin" className="d-flex align-items-center p-3 text-decoration-none">
          <div className="sidebar-logo-container">
            <Image 
              src="/images/sncf-logo.png" 
              alt="SNCF Logo"
              width={100}
              height={28}
              priority
              className="sidebar-logo"
            />
          </div>
          <span className="ms-3 text-primary fw-bold">{companyName}</span>
        </Link>
      </div>
      
      <div className="sncf-sidebar-content">
        <div className="nav flex-column">
          <Link 
            href="/admin" 
            className={`sncf-nav-link ${currentPath === '/admin' ? 'active' : ''}`}
          >
            <span className="material-icons">dashboard</span>
            <span>Dashboard</span>
          </Link>

          <div className="sncf-nav-section">
            <div className="sncf-nav-section-title">Gestion</div>
            <Link 
              href="/admin/entreprise" 
              className={`sncf-nav-link ${currentPath === '/admin/entreprise' ? 'active' : ''}`}
            >
              <span className="material-icons">business</span>
              <span>Entreprise</span>
            </Link>

            <Link 
              href="/stations" 
              className={`sncf-nav-link ${currentPath === '/stations' ? 'active' : ''}`}
            >
              <span className="material-icons">train</span>
              <span>Gestion de gares</span>
            </Link>

            <Link 
              href="/admin/materiels-roulants" 
              className={`sncf-nav-link ${currentPath === '/admin/materiels-roulants' ? 'active' : ''}`}
            >
              <span className="material-icons">settings</span>
              <span>Matériels Roulants</span>
            </Link>
            <Link 
              href="/admin/billetique.js" 
              className={`sncf-nav-link ${currentPath === '/admin/billetique' ? 'active' : ''}`}
            >
              <div><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="var(--primary-color)" width="24" aria-hidden="true" data-testid="icon-order" 
              focusable="false" class="jsx-7fe9084330cc5140">
                <path fill-rule="evenodd" d="M18.581 1.705l1.185 1.186c-.006.006-.015.006-.022.013-.143.143-.16.392-.015.534l2.258 2.265c.142.14.391.125.533-.018.008-.006.01-.014.014-.02l1.107 1.11c.479.478.479 1.251 0 1.73L8.492 23.643a1.221 1.221 0 0 1-1.73-.004l-5.06-5.066L18.58 1.705zM15.508.357a1.221 1.221 0 0 1 1.73.004l.118.115L.473 17.342l-.116-.116a1.227 1.227 0 0 1 0-1.732z" class="jsx-7fe9084330cc5140"></path>
                </svg>
                 </span> 
                 
              <span>Gestion de la Billetique</span>
              </div>
            </Link>
          </div>

          <div className="sncf-nav-section">
            <div className="sncf-nav-section-title">Horaires & Trafic</div>
            <Link 
              href="/admin/horaires" 
              className={`sncf-nav-link ${currentPath === '/admin/horaires' ? 'active' : ''}`}
            >
              <span className="material-icons">schedule</span>
              <span>Horaires</span>
            </Link>

            <Link 
              href="/admin/gestion-horaires" 
              className={`sncf-nav-link ${currentPath === '/admin/gestion-horaires' ? 'active' : ''}`}
            >
              <span className="material-icons">today</span>
              <span>Panneau de Contrôle</span>
            </Link>

            <Link 
              href="/admin/info-trafics" 
              className={`sncf-nav-link ${currentPath === '/admin/info-trafics' ? 'active' : ''}`}
            >
              <span className="material-icons">info</span>
              <span>Infos Trafic</span>
            </Link>

            <Link 
              href="/admin/attribution-voie" 
              className={`sncf-nav-link ${currentPath === '/admin/attribution-voie' ? 'active' : ''}`}
            >
              <span className="material-icons">alt_route</span>
              <span>Attribution Voie</span>
            </Link>
          </div>

          <div className="sncf-nav-section">
            <div className="sncf-nav-section-title">Annonces Sonores</div>
            <div className={`sncf-nav-group ${isAnnouncementMenuOpen ? 'open' : ''}`}>
              <button 
                onClick={toggleAnnouncementMenu}
                className="sncf-nav-link w-100"
              >
                <span className="material-icons">campaign</span>
                <span>Système d'annonces</span>
                <span className="material-icons ms-auto">
                  {isAnnouncementMenuOpen ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              
              <div className="sncf-nav-group-content">
                <Link 
                  href="/admin/banque-de-sons" 
                  className={`sncf-nav-link ${currentPath === '/admin/banque-de-sons' ? 'active' : ''}`}
                >
                  <span className="material-icons">library_music</span>
                  <span>Banque de sons</span>
                </Link>
                
                <Link 
                  href="/admin/conception-annonce" 
                  className={`sncf-nav-link ${currentPath === '/admin/conception-annonce' ? 'active' : ''}`}
                >
                  <span className="material-icons">edit</span>
                  <span>Conception annonce</span>
                </Link>
                
                <Link 
                  href="/admin/liste-annonces" 
                  className={`sncf-nav-link ${currentPath === '/admin/liste-annonces' ? 'active' : ''}`}
                >
                  <span className="material-icons">list</span>
                  <span>Liste annonces</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="sncf-nav-section">
            <div className="sncf-nav-section-title">Système</div>
            <Link 
              href="/admin/sauvegarde" 
              className={`sncf-nav-link ${currentPath === '/admin/sauvegarde' ? 'active' : ''}`}
            >
              <span className="material-icons">save</span>
              <span>Sauvegarde</span>
            </Link>

            <Link 
              href="/admin/update" 
              className={`sncf-nav-link ${currentPath === '/admin/update' ? 'active' : ''}`}
            >
              <span className="material-icons">system_update</span>
              <span>Mise à jour</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="sncf-sidebar-footer">
        <button 
          onClick={handleLogout} 
          className="sncf-nav-link w-100 text-danger border-0 bg-transparent"
        >
          <span className="material-icons">logout</span>
          <span>Déconnexion</span>
        </button>
      </div>
    </nav>
  );
}
