import React from "react";
import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { H3 } from "@/templates/LandingPage/components/headings";
import ApiService from "@/services/ApiService";
import Cookies from "js-cookie";
import ModalConfirm from "../SmallPart/ModalConfirm";
import Validation from "@/validation/Validation";
import {
  ToastFailed,
  ToastSuccess,
  formatCurrency,
  handleDelete,
  jsonToString,
} from "../SmallPart/SmallPart";

const apiService = new ApiService();

interface Account {
  id: number;
  name: string;
  balance: number;
  type: string;
}

const AccountTabContent = () => {
  const [error, setError] = useState<string>("");

  // modal
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [selectedId, setSelectedId] = useState<number>();

  const [formData, setFormData] = useState({
    accountName: "",
    ballance: "",
    type: "",
    userId: "",
  });

  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState<Account[]>([]);

  const handleDeleteClick = (id: number, name: string) => {
    setSelectedName(name);
    setSelectedId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    const deleteSuccess = await handleDelete(
      `account/${selectedId}`,
      selectedName
    );
    if (deleteSuccess) {
      setAccounts((prevAccounts) =>
        prevAccounts.filter((account) => account.id !== selectedId)
      );
    }
    setModalOpen(false);
  };

  const handleCancelDelete = () => {
    setModalOpen(false);
  };
  // batas modal

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const fetchAccounts = async () => {
    if (!user?.id) return;

    try {
      const response = await apiService.get(`accounts/${user.id}`);
      if (Array.isArray(response)) {
        setAccounts(response);
      } else {
        setError("Data akun tidak ditemukan dalam format yang benar.");
      }
    } catch (error) {
      setError("Gagal mengambil data akun");
    } finally {
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [user]);

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

    const validate = Validation.validateAccount(formData);
    if (validate != true) {
      setError(jsonToString(validate));
      ToastFailed("Validasi gagal !");
      return;
    }

    setError("");

    const response = await apiService.post("account", formData);
    if (response.status >= 200 && response.status < 300) {
      setFormData({
        accountName: "",
        ballance: "",
        type: "",
        userId: user.id,
      });
      ToastSuccess();
      fetchAccounts();
    } else {
      setError("Terjadi kesalahan, data yang diinput tidak valid");
      ToastFailed();
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
                    onClick={() => handleDeleteClick(account.id, account.name)}
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
        message={`Apakah Anda yakin ingin menghapus "${selectedName}" ?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        yes="Ya"
        no="Batal"
      />
    </>
  );
};

export default AccountTabContent;
