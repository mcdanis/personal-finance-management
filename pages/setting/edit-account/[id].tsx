import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Layout from "../../../components/Layout";
import { H3, H2 } from "../../../templates/LandingPage/components/headings";
import ApiService from "../../../services/ApiService";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

interface FormData {
  accountName: string;
  ballance: string;
  type: string;
}

const EditAccount = () => {
  const router = useRouter();
  const { id } = router.query;

  const notifySuccess = (msg = "Data berhasil disimpan!") => toast.success(msg);
  const notifyFailed = (msg = "Data gagal di input!") => toast.warning(msg);

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

  useEffect(() => {
    if (id) {
      fetchAccount();
    }
  }, [id]);

  const validateFields = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.accountName.trim()) {
      newErrors.accountName = "Account name is required.";
    }

    if (!formData.ballance || isNaN(Number(formData.ballance))) {
      newErrors.balance = "Balance must be a valid number.";
    }

    if (!formData.type) {
      newErrors.type = "Type is required.";
    }

    setError(
      Object.entries(newErrors)
        .map(([key, value]) => `${value}`)
        .join("<br>")
    );
    return Object.keys(newErrors).length <= 0;
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateFields()) {
      notifyFailed();
      return;
    }

    const response = await apiService.put(`account/${id}`, formData);
    if (response.status >= 200 && response.status < 300) {
      notifySuccess();
    } else {
      setError("Terjadi kesalahan, data yang diinput tidak valid");
      notifyFailed();
    }
  };

  const back = () => {
    router.back()
  }
  return (
    <Layout title="Edit Account">
      <div className="relative isolate px-6 pt-40 lg:px-8">
        <div className="text-center">
          <H2>Edit Account</H2>
        </div>
        <div className="w-full max-w-4xl mx-auto z-10 mt-3">
          <div className="border-b border-gray-300">
            <form
              onSubmit={handleUpdate}
              className="mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
            >
              <button type="button" onClick={back} className="flex items-center px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Kembali
              </button>

              <H3>Edit Account</H3>
              {error && (
                <div>
                  <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4 text-red-600">
                    <p
                      className="text-sm font-medium"
                      dangerouslySetInnerHTML={{ __html: error }}
                    ></p>
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

export default EditAccount;
