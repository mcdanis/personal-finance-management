import React from "react";
import Layout from "../../components/Layout";
import Tabs from "../../components/Transaction/Tabs";
import { H1, H2 } from "../../templates/LandingPage/components/headings";

const DebitPage = () => {
  return (
    <>
      <Layout title="Laporan Custom">
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="text-center">
            <H2>Laporan Custom</H2>
          </div>
          <div className="w-full max-w-4xl mx-auto z-10 mt-10 mb-3">
            <div className="w-full md:w-2/2">
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 pr-2">
                  <span className="font-bold">Tanggal Awal</span>
                  <input
                    type="date"
                    className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="w-full md:w-1/2 pl-2">
                  <span className="font-bold">Tanggal Akhir</span>
                  <input
                    type="date"
                    className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>
          <Tabs tab1="Pengeluaran" tab2="Pemasukan" type="customReport" />
        </div>
      </Layout>
    </>
  );
};

export default DebitPage;
