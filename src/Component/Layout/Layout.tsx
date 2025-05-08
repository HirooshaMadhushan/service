import React from 'react';
import Navbar from '../Navbar/Navbar/Navbar';
import Footer from '../Footer/Footer';

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container flex-1 p-4 mx-auto">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
