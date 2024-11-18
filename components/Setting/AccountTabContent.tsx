import React from "react";
import { useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { H4, H3 } from "../../templates/LandingPage/components/headings";
import ApiService from "../../services/ApiService";

const apiService = new ApiService();


const AccountTabContent = () => {

  const [formData, setFormData] = useState({ accountName: '', ballance: '' });
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await apiService.post('account', formData);
    console.log(response)
    if (response.status >= 200 && response.status < 300) {
      alert('berhasil input');
      setFormData({ accountName: '', ballance: '' });
    } else {
      setError("Terjadi kesalahan, coba lagi nanti");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
      >
        <H3>Tambah Account</H3>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="account"
              className="block text-sm font-semibold text-gray-700"
            >
              Nama Account
            </label>
            <input
              type="text"
              id="account"
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="BCA, BSI, OVO, dll"
            />
          </div>
          <div>
            <label
              htmlFor="balance"
              className="block text-sm font-semibold text-gray-700"
            >
              Balance
            </label>
            <input
              type="number"
              id="balance"
              name="ballance"
              value={formData.ballance}
              onChange={handleChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="5000000"
            />
          </div>
        </div>
        <button className="px-5 w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" type="submit">
          Tambah Account
        </button>
      </form>
      <hr className="border-t border-gray-300 my-4" />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pengeluaran
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nominal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">1</td>
              <td className="px-6 py-4 whitespace-nowrap">BNI</td>
              <td className="px-6 py-4 whitespace-nowrap">Rp80.237.900</td>
              <td className="">
                <Link href={`/transaction/edit-expenditure/8`}>
                  <button className="inline-flex items-center px-2 py-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
                    Edit
                    <svg
                      className="w-4 h-4 ml-1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 4l4 4-8 8H8v-4l8-8z"
                      />
                    </svg>
                  </button>
                </Link>&nbsp;|&nbsp;
                <Link href={`/transaction/edit-expenditure/8`}>
                  <button className="inline-flex items-center px-2 py-1 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
                    Hapus
                    <svg
                      className="w-4 h-4 ml-1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 6h18M9 6v12m6-12v12M3 6h18m-6 0v-2a2 2 0 00-2-2H9a2 2 0 00-2 2v2M5 6h14a1 1 0 011 1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V7a1 1 0 011-1z"
                      />
                    </svg>

                  </button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AccountTabContent;
