import React from "react";
import Layout from "../../components/Layout";
import Tabs from "../../components/Transaction/Tabs";
import { H4, H2 } from "../../templates/LandingPage/components/headings";

const DebitPage = () => {
  return (
    <>
      <Layout title="Laporan Harian">
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="text-center">
            <H2>Laporan harian</H2>
          </div>
          <div className="w-full max-w-4xl mx-auto z-10 mt-10 mb-3">
            <div className="border-b border-gray-300">
              <div className="flex flex-wrap">
                <H4>Pilih tanggal</H4>
                <input
                  type="date"
                  id="tanggal"
                  name="tanggal"
                  className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
          <Tabs tab1="Pengeluaran" tab2="Pemasukan" type="dailyReport" />
        </div>
      </Layout>
    </>
  );
};

export default DebitPage;
