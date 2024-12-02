import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Layout from "@/components/Layout";
import { H3, H2 } from "@/templates/LandingPage/components/headings";
import ApiService from "@/services/ApiService";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Validation from "@/validation/Validation";
import {
  ToastFailed,
  ToastSuccess,
  jsonToString,
} from "@/components/SmallPart/SmallPart";

interface FormData {
  name: string;
  id: number;
  categoryId: number | null;
}

interface Category {
  name: string;
}

const EditAccount = () => {
  const router = useRouter();
  const { id } = router.query;

  const [categories, setCategories] = useState<Category[]>([]);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    id: id,
    categoryId: null,
  });

  const [user, setUser] = useState(null);

  const [error, setError] = useState<string>("");

  const apiService = new ApiService();

  const fetchSubCategory = async () => {
    try {
      const response = await apiService.get(`sub-category/${id}`);
      if (response && typeof response === "object") {
        setFormData({
          name: response[0].name || "",
          id: response[0].id || "",
          categoryId: response[0].category_id || "",
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
      fetchSubCategory();
    }
  }, [id]);

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    fetchCategory();
  }, [user]);

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    const validate = Validation.validateSubCategory(formData);
    if (validate != true) {
      setError(jsonToString(validate));
      ToastFailed();
      return;
    }
    setError("");

    const response = await apiService.put(`sub-category/${id}`, formData);
    if (response.status >= 200 && response.status < 300) {
      ToastSuccess();
    } else {
      setError("Terjadi kesalahan, data yang diinput tidak valid");
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

  const back = () => {
    router.back();
  };
  return (
    <Layout title="Edit Kategori">
      <div className="relative isolate px-6 pt-40 lg:px-8">
        <div className="text-center">
          <H2>Edit Kategori</H2>
        </div>
        <div className="w-full max-w-4xl mx-auto z-10 mt-3">
          <div className="border-b border-gray-300">
            <form
              onSubmit={handleUpdate}
              className="mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
            >
              <button
                type="button"
                onClick={back}
                className="flex items-center px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out text-sm"
              >
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

              <H3>Edit Sub Category</H3>
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
