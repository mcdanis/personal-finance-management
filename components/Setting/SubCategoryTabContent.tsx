import React from "react";
import { H3, H2 } from "@/templates/LandingPage/components/headings";
import { useState, useEffect, FormEvent } from "react";
import ApiService from "@/services/ApiService";
import Cookies from "js-cookie";
import Validation from "@/validation/Validation";
import ModalConfirm from "../SmallPart/ModalConfirm";
import Link from "next/link";
import {
  ToastFailed,
  handleDelete,
  ToastSuccess,
  jsonToString,
} from "../SmallPart/SmallPart";

interface Category {
  name: string;
}

interface SubCategory {
  name: string;
  category_id: number;
  category_name: string;
}

const SubCategoryTabContent = () => {
  const apiService = new ApiService();

  const [error, setError] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [user, setUser] = useState(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [selectedId, setSelectedId] = useState<number>();

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    userId: "",
  });

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    fetchCategory();
    fetchSubCategory();
  }, [user]);

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

  const fetchSubCategory = async () => {
    if (!user?.id) return;

    try {
      const response = await apiService.get(`sub-categories/${user.id}`);
      if (Array.isArray(response)) {
        setSubCategories(response);
      } else {
        setError("Data sub kategori tidak ditemukan dalam format yang benar.");
      }
    } catch (error) {
      setError("Gagal mengambil data akun");
    }
  };

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

    const validate = Validation.validateSubCategory(formData);
    if (validate != true) {
      setError(jsonToString(validate));
      ToastFailed("Validasi gagal !");
      return;
    }

    setError("");

    const response = await apiService.post("sub-category", formData);
    if (response.status >= 200 && response.status < 300) {
      setFormData({
        name: "",
        categoryId: "",
        userId: user.id,
      });
      ToastSuccess();
      fetchSubCategory();
    } else {
      setError("Terjadi kesalahan!, data yang diinput tidak valid");
      ToastFailed();
    }
  };

  const handleDeleteClick = (id: number, name: string) => {
    setSelectedName(name);
    setSelectedId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    const deleteSuccess = await handleDelete(
      `sub-category/${selectedId}`,
      selectedName
    );
    if (deleteSuccess) {
      setSubCategories((prevSubCategory) =>
        prevSubCategory.filter((subCategory) => subCategory.id !== selectedId)
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
        <H3>Tambah Sub Kategori</H3>
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
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700"
            >
              Nama Sub-Kategori
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Kebutuhan bahan pokok"
            />
          </div>
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-semibold text-gray-700"
            >
              Kategori Utama
            </label>
            <select
              id="options"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="" disabled>
                Pilih Kategori Utama
              </option>
              {categories.map((cat, index) => (
                <option key={index} value={cat.id}>
                  {cat.name}
                </option>
              ))};
            </select>
          </div>
        </div>
        <button
          className="px-5 w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="submit"
        >
          Tambah Sub Kategori
        </button>
      </form>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nama Sub Kategori
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Kategori
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {subCategories.map((subCategory, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {subCategory.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{subCategory.category_name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link href={`/setting/edit-sub-category/${subCategory.id}`}>
                  <button className="inline-flex items-center px-2 py-1 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
                    Edit
                  </button>
                </Link>
                &nbsp;|&nbsp;
                <button
                  onClick={() => handleDeleteClick(subCategory.id, subCategory.name)}
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

export default SubCategoryTabContent;
