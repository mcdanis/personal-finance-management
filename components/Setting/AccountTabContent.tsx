import React from "react";
import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { H3 } from "../../templates/LandingPage/components/headings";
import ApiService from "../../services/ApiService";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import ModalConfirm from "../SmallPart/ModalConfirm";

const apiService = new ApiService();

const AccountTabContent = () => {
  // modal
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedName, setSelectedName] = useState("");

  const handleDeleteClick = (name: string) => {
    setSelectedName(name);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log(`Hapus item: ${selectedName}`);
    setModalOpen(false);
  };

  const handleCancelDelete = () => {
    setModalOpen(false);
  };
  // modal batas
  const notifySuccess = (msg = "Data berhasil disimpan!") => toast.success(msg);
  const notifyFailed = (msg = "Data gagal di input!") => toast.warning(msg);

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

  const fetchAccounts = async () => {
    if (!user?.id) return;

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

  useEffect(() => {
    fetchAccounts();
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateFields()) {
      notifyFailed();
      return;
    }

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
      fetchAccounts();
    } else {
      setError("Terjadi kesalahan, data yang diinput tidak valid");
      notifyFailed();
    }
  };

  const handleDelete = async (id: number, name: string) => {
    const isConfirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus ${name} ini?`
    );

    if (!isConfirmed) return;

    try {
      const response = await apiService.delete(`account/${id}`);

      if (response.ok) {
        setAccounts((prevAccounts) =>
          prevAccounts.filter((account) => account.id !== id)
        );
        notifySuccess(`${name} berhasil di hapus`);
      } else {
        notifyFailed(`${name} gagal di hapus`);
      }
    } catch (error) {
      notifyFailed(`Terjadi kesalahan saat menghapus ${name}, coba lagi !`);
    }
  };

  const getTypeLabel = (type: string) => {
    const typeMap: { [key: string]: string } = {
      g: "Giro",
      s: "Saving",
      w: "Wallet",
    };
    return typeMap[type] || "Unknown";
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("id-ID").format(value);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
      >
        <H3>Tambah Account</H3>
        {error && (
          <div>
            <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4 text-red-600">
              <div className="flex items-start">
                <div>
                  <p
                    className="text-sm font-medium"
                    dangerouslySetInnerHTML={{ __html: error }}
                  ></p>
                </div>
              </div>
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
                Nama Account
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nominal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jenis Account
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {accounts.map((account, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{account.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  Rp{formatCurrency(account.balance)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getTypeLabel(account.type)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`/setting/edit-account/${account.id}`}>
                    <button className="inline-flex items-center px-2 py-1 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
                      Edit
                    </button>
                  </Link>
                  &nbsp;|&nbsp;
                  <button
                    // onClick={() => handleDeleteClick("Item Name")}
                    onClick={() => handleDelete(account.id, account.name)}
                    className="inline-flex items-center px-2 py-1 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalConfirm
        isOpen={isModalOpen}
        title="Konfirmasi Hapus"
        message={`Apakah Anda yakin ingin menghapus ${selectedName} ini?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default AccountTabContent;
