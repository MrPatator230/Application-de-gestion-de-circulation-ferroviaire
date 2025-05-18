import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="main-wrapper">
      <Header />
      <main className="main-container">
        <div className="container-fluid">
          {children}
        </div>
      </main>
    </div>
  );
}
