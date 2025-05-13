import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { AuthContext } from '../pages/_app';
import { SettingsContext } from '../contexts/SettingsContext';

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
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion d-flex flex-column"
      id="accordionSidebar"
      style={{ height: '100vh', position: 'sticky', top: 0 }}
    >
      <Link href="/admin" className="sidebar-brand d-flex align-items-center justify-content-center">
        <div className="sidebar-brand-icon">
          <i className="fas fa-train"></i>
        </div>
        <div className="sidebar-brand-text mx-3">{companyName}</div>
      </Link>
      <hr className="sidebar-divider my-0" />
      <li className={`nav-item ${currentPath === '/admin' ? 'active' : ''}`}>
        <Link href="/admin" className="nav-link">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>
      </li>
      <li className={`nav-item ${currentPath === '/admin/entreprise' ? 'active' : ''}`}>
        <Link href="/admin/entreprise" className="nav-link">
          <i className="fas fa-fw fa-building"></i>
          <span>Entreprise</span>
        </Link>
      </li>
      <li className={`nav-item ${currentPath === '/stations' ? 'active' : ''}`}>
        <Link href="/stations" className="nav-link">
          <i className="fas fa-fw fa-train"></i>
          <span>Gestion de gares</span>
        </Link>
      </li>
      <li className={`nav-item ${currentPath === '/admin/horaires' ? 'active' : ''}`}>
        <Link href="/admin/horaires" className="nav-link">
          <i className="fas fa-fw fa-clock"></i>
          <span>Horaires</span>
        </Link>
      </li>
      <li className={`nav-item ${currentPath === '/admin/materiels-roulants' ? 'active' : ''}`}>
        <Link href="/admin/materiels-roulants" className="nav-link">
          <i className="fas fa-fw fa-cogs"></i>
          <span>Matériels Roulants</span>
        </Link>
      </li>
      <li className={`nav-item ${currentPath === '/admin/info-trafics' ? 'active' : ''}`}>
        <Link href="/admin/info-trafics" className="nav-link">
          <i className="fas fa-fw fa-info-circle"></i>
          <span>Infos Trafic</span>
        </Link>
      </li>
      <li className={`nav-item ${currentPath === '/admin/attribution-voie' ? 'active' : ''}`}>
        <Link href="/admin/attribution-voie" className="nav-link">
          <i className="fas fa-fw fa-map-signs"></i>
          <span>Attribution Voie</span>
        </Link>
      </li>
      <li className={`nav-item ${currentPath === '/admin/type-horaires' ? 'active' : ''}`}>
        <Link href="/admin/type-horaires" className="nav-link">
          <i className="fas fa-fw fa-clock"></i>
          <span>Type Horaires</span>
        </Link>
      </li>
      <li className={`nav-item ${currentPath === '/admin/sauvegarde' ? 'active' : ''}`}>
        <Link href="/admin/sauvegarde" className="nav-link">
          <i className="fas fa-fw fa-save"></i>
          <span>Sauvegarde</span>
        </Link>
      </li>
      <li className={`nav-item ${currentPath === '/admin/update' ? 'active' : ''}`}>
        <Link href="/admin/update" className="nav-link">
          <i className="fas fa-fw fa-sync-alt"></i>
          <span>Mise à jour</span>
        </Link>
      </li>

      {/* Announcement System Folder */}
      <li className="nav-item">
        <a href="#" className="nav-link" onClick={toggleAnnouncementMenu}>
          <i className="fas fa-fw fa-bullhorn"></i>
          <span>Système d'annonces sonores</span>
          <i className={`fas fa-caret-${isAnnouncementMenuOpen ? 'down' : 'right'} ml-auto`}></i>
        </a>
        {isAnnouncementMenuOpen && (
          <ul className="nav flex-column ml-3">
            <li className={`nav-item ${currentPath === '/admin/banque-de-sons' ? 'active' : ''}`}>
              <Link href="/admin/banque-de-sons" className="nav-link">
                <span>Banque de sons</span>
              </Link>
            </li>
            <li className={`nav-item ${currentPath === '/admin/conception-annonce' ? 'active' : ''}`}>
              <Link href="/admin/conception-annonce" className="nav-link">
                <span>Conception annonce</span>
              </Link>
            </li>
            <li className={`nav-item ${currentPath === '/admin/liste-annonces' ? 'active' : ''}`}>
              <Link href="/admin/liste-annonces" className="nav-link">
                <span>Liste annonces</span>
              </Link>
            </li>
          </ul>
        )}
      </li>

      <hr className="sidebar-divider mt-auto" />
      <li className="nav-item">
        <a href="#" onClick={handleLogout} className="nav-link">
          <i className="fas fa-sign-out-alt"></i>
          <span>Déconnexion</span>
        </a>
      </li>
    </ul>
  );
}
