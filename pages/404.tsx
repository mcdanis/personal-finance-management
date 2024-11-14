import React from 'react';
import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-indigo-600">404</h1>
        <p className="text-xl text-gray-600 mt-4">Oops! Halaman yang Anda cari tidak ditemukan.</p>
        <p className="mt-4 text-lg text-gray-500">Mungkin Anda ingin kembali ke beranda atau mencoba pencarian lain.</p>
        
        <div className="mt-8">
          <Link href="/" className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Kembali ke Beranda
          </Link>
        </div>
        
        {/* Optionally, add a search bar or more actions */}
        {/* <div className="mt-4">
          <input 
            type="text" 
            placeholder="Cari sesuatu..."
            className="px-4 py-2 border border-gray-300 rounded-lg w-72"
          />
        </div> */}
      </div>
    </div>
  );
};

export default Custom404;
