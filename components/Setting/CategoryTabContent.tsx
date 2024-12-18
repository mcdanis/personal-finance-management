import React from "react";
import { H3, H2 } from "@/templates/LandingPage/components/headings";
import { useState, useEffect, FormEvent } from "react";
import ApiService from "@/services/ApiService";
import Cookies from "js-cookie";
import Link from "next/link";
import ModalConfirm from "../SmallPart/ModalConfirm";
import Validation from "@/validation/Validation";
import {
  ToastFailed,
  ToastSuccess,
  handleDelete,
  jsonToString,
} from "../SmallPart/SmallPart";

const apiService = new ApiService();

interface Category {
  name: string;
}

const CategoryTabContent = () => {
  const [error, setError] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);

  const [formData, setFormData] = useState({
    category: "",
  });
  const [user, setUser] = useState(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [selectedId, setSelectedId] = useState<number>();

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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

    const validate = Validation.validateCategory(formData);
    if (validate != true) {
      setError(jsonToString(validate));
      ToastFailed("Validasi gagal !");
      return;
    }

    setError("");

    const response = await apiService.post("category", formData);
    if (response.status >= 200 && response.status < 300) {
      setFormData({
        category: "",
        userId: user.id,
      });
      ToastSuccess();
      fetchCategory();
    } else {
      setError("Terjadi kesalahan!, data yang diinput tidak valid");
      ToastFailed();
    }
  };

  const fetchCategory = async () => {
    if (!user?.id) return;

    try {
      const response = await apiService.get(`categories/${user.id}`);
      if (Array.isArray(response)) {
        setCategories(response);
      } else {
        setError("Data kategori tidak ditemukan dalam format yang benar.");
      }
    } catch (error) {
      setError("Gagal mengambil data akun");
    }
  };

  useEffect(() => {
    fetchCategory();
    // fetchSubCategory();
  }, [user]);

  const handleDeleteClick = (id: number, name: string) => {
    setSelectedName(name);
    setSelectedId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    const deleteSuccess = await handleDelete(
      `category/${selectedId}`,
      selectedName
    );
    if (deleteSuccess) {
      setCategories((prevCategory) =>
        prevCategory.filter((category) => category.id !== selectedId)
      );
    }
    setModalOpen(false);
  };

  const handleCancelDelete = () => {
    setModalOpen(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
      >
        <H3>Tambah Kategori</H3>
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

        <div className="grid grid-cols-1">
          <div>
            <label
              htmlFor="kategori"
              className="block text-sm font-semibold text-gray-700"
            >
              Kategori Baru
            </label>
            <input
              type="text"
              id="kategori"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Kebutuhan Bulanan"
            />
          </div>
        </div>
        <button
          className="px-5 w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="submit"
        >
          Tambah Kategori
        </button>
      </form>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nama Kategori
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {categories.map((category, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{category.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link href={`/setting/edit-category/${category.id}`}>
                  <button className="inline-flex items-center px-2 py-1 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
                    Edit
                  </button>
                </Link>
                &nbsp;|&nbsp;
                <button
                  onClick={() => handleDeleteClick(category.id, category.name)}
                  className="inline-flex items-center px-2 py-1 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default CategoryTabContent;
