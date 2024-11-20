import React from "react";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { H3 } from "../../templates/LandingPage/components/headings";
import ApiService from "../../services/ApiService";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const apiService = new ApiService();

const AccountTabContent = () => {
  const notifySuccess = () => toast.success("Data berhasil disimpan!");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const [formData, setFormData] = useState({
    accountName: "",
    ballance: "",
    type: "",
    userId: "",
  });

  useEffect(() => {
    if (user?.id) {
      const fetchAccounts = async () => {
        try {
          setLoading(true);
          const response = await apiService.get(`accounts/${user.id}`);
          if (Array.isArray(response)) {
            setAccounts(response);
          } else {
            setError("Data akun tidak ditemukan dalam format yang benar.");
          }
        } catch (error) {
          setError("Gagal mengambil data akun");
        } finally {
          setLoading(false);
        }
      };
      fetchAccounts();
    }
  }, [user]);

  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      userId: user.id,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await apiService.post("account", formData);
    console.log(response);
    if (response.status >= 200 && response.status < 300) {
      setFormData({
        accountName: "",
        ballance: "",
        type: "",
        userId: user.id,
      });
      notifySuccess();
    } else {
      setError("Terjadi kesalahan, data yang diinput tidak valid");
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
              htmlFor="type"
              className="block text-sm font-semibold text-gray-700"
            >
              Nama Account
            </label>
            <select
              id="options"
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
            {accounts.map((account, index) => (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{account.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  Rp{account.balance}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`/transaction/edit-expenditure/8`}>
                    <button className="inline-flex items-center px-2 py-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
                      Edit
                    </button>
                  </Link>
                  &nbsp;|&nbsp;
                  <Link href={`/transaction/edit-expenditure/8`}>
                    <button className="inline-flex items-center px-2 py-1 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
                      Hapus
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AccountTabContent;
