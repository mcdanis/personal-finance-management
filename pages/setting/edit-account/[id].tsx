import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Layout from "../../../components/Layout";
import { H3, H2 } from "../../../templates/LandingPage/components/headings";
import ApiService from "../../../services/ApiService";
import { useRouter } from "next/router";

interface FormData {
  accountName: string;
  ballance: string;
  type: string;
}

const SettingPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState<FormData>({
    accountName: "",
    ballance: "",
    type: "",
  });

  const [error, setError] = useState<string>("");

  const apiService = new ApiService();

  // Fungsi untuk mengambil data dari API
  const fetchAccount = async () => {
    try {
      const response = await apiService.get(`account/${id}`);
      if (response && typeof response === "object") {
        setFormData({
          accountName: response[0].name || "",
          ballance: response[0].balance || "",
          type: response[0].type || "",
        });
      } else {
        setError("Data akun tidak ditemukan dalam format yang benar.");
      }
    } catch (error) {
      setError("Gagal mengambil data akun.");
    }
  };

  // Handler untuk perubahan input
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Ambil data saat id berubah
  useEffect(() => {
    if (id) {
      fetchAccount();
    }
  }, [id]);

  return (
    <Layout title="Edit Account">
      <div className="relative isolate px-6 pt-40 lg:px-8">
        <div className="text-center">
          <H2>Edit Account</H2>
        </div>
        <div className="w-full max-w-4xl mx-auto z-10 mt-3">
          <div className="border-b border-gray-300">
            <form
              // Tambahkan fungsi submit jika diperlukan
              className="mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
            >
              <H3>Edit Account</H3>
              {error && (
                <div>
                  <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4 text-red-600">
                    <p>{error}</p>
                  </div>
                </div>
              )}

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
                    htmlFor="type"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Jenis Account
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="" disabled>
                      Pilih jenis Account
                    </option>
                    <option value="s">Saving</option>
                    <option value="g">Giro</option>
                    <option value="w">Wallet</option>
                  </select>
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
              <button
                className="px-5 w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="submit"
              >
                Simpan Perubahan
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingPage;
