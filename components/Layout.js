import Header from './Header';
import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <div className="main-wrapper">
      <Head>
        <link 
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" 
          rel="stylesheet"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
          defer
        ></script>
      </Head>
      <Header />
      <main className="main-container">
        <div className="container-fluid">
          {children}
        </div>
      </main>
    </div>
  );
}
