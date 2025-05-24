import Header from './Header';
import Head from 'next/head';
import Script from 'next/script';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="main-wrapper d-flex flex-column min-vh-100">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      />
      <Header />
      <main className="main-container flex-grow-1">
        <div className="container-fluid">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
