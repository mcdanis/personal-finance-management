import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Layout from "@/components/Layout";
import { H3, H2 } from "@/templates/LandingPage/components/headings";
import ApiService from "@/services/ApiService";
import { useRouter } from "next/router";
import Validation from "@/validation/Validation";
import {
  ToastFailed,
  ToastSuccess,
  jsonToString,
} from "@/components/SmallPart/SmallPart";

interface FormData {
  category: string;
  id: number;
}

const EditCategory = () => {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState<FormData>({
    category: "",
  });

  const [error, setError] = useState<string>("");

  const apiService = new ApiService();

  const fetchAccount = async () => {
    try {
      const response = await apiService.get(`category/${id}`);
      if (response && typeof response === "object") {
        setFormData({
          category: response[0].name || "",
          id: response[0].id || "",
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

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    const validate = Validation.validateCategory(formData);
    if (validate != true) {
      setError(jsonToString(validate));
      ToastFailed();
      return;
    }
    setError("");

    const response = await apiService.put(`category/${id}`, formData);
    if (response.status >= 200 && response.status < 300) {
      ToastSuccess();
    } else {
      setError("Terjadi kesalahan, data yang diinput tidak valid");
      ToastFailed();
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

              <H3>Edit Kategori</H3>
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
                    Kategori
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="..."
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

export default EditCategory;
