import Link from "next/link";
import { H3 } from "@/templates/LandingPage/components/headings";
import { useState, useEffect } from "react";
import Validation from "@/validation/Validation";
import ApiService from "@/services/ApiService";
import Cookies from "js-cookie";
import {
  ToastFailed,
  formatCurrency,
  ToastSuccess,
  jsonToString,
} from "@/components/SmallPart/SmallPart";

interface Expenditure {
  name: string;
  date: Date;
  categoryId: number;
  subCategoryId: number;
  value: number;
  description: string;
  accountId: number;
  userId: number;
}

interface ExpenditureData {
  name: string;
  date: Date;
  sub_category_name: number;
  amount: number;
  account_name: number;
}

interface Category {
  id: string;
  name: string;
}

interface SubCategory {
  id: number;
  name: string;
  category_id: number;
  category_name: string;
}

interface Account {
  name: string;
  id: number;
}

// const userPublic = Cookies.get("user");
function UserPublic() {
  const user = Cookies.get("user");
  return user ? JSON.parse(user) : null;
}

const apiService = new ApiService();

export const ExpenditureTabContentData = () => {
  const [expenditure, setExpenditure] = useState<ExpenditureData[]>([]);
  const [error, setError] = useState<String>();
  const userPublic = UserPublic();

  const fetchExpenditure = async () => {
    if (!userPublic?.id) return;

    try {
      const response = await apiService.get(
        `expenditure/${userPublic.id}/today`
      );
      if (Array.isArray(response)) {
        setExpenditure(response);
      } else {
        setError("Expenditure tidak ditemukan dalam format yang benar.");
      }
    } catch (error) {
      console.log(error);
      setError("Gagal mengambil data akun");
    }
  };

  useEffect(() => {
    fetchExpenditure();
  }, []);

  return (
    <div className="overflow-x-auto">
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
      <H3>Hari ini</H3>
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Akun
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sub Kategori
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {expenditure.map((exp, index) => (
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{exp.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatCurrency(exp.amount)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {exp.account_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {exp.sub_category_name}
              </td>
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
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const ExpenditureTabContentInput = () => {
  const [error, setError] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [subCategoriesFiltered, setSubCategoriesFiltered] = useState<
    SubCategory[]
  >([]);

  const userPublic = UserPublic();

  const defaultExpenditureFormData: Expenditure = {
    name: "",
    date: new Date(),
    categoryId: 0,
    subCategoryId: 0,
    value: 0,
    description: "",
    accountId: 0,
    userId: 0,
  };

  const [formData, setFormData] = useState<Expenditure>(
    defaultExpenditureFormData
  );

  useEffect(() => {
    fetchCategories();
    fetchAccounts();
    fetchSubCategory();
    // fetchExpenditure();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "date" ? new Date(value) : value,
      userId: userPublic.id,
    });

    if (name == "categoryId") {
      handleFilterSubCategories(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = Validation.validateExpenditure(formData);
    if (validation != true) {
      setError(jsonToString(validation));
      ToastFailed();
      return;
    }

    setError("");

    const response = await apiService.post(`expenditure/`, formData);
    if (response.status >= 200 && response.status < 300) {
      ToastSuccess();
      setFormData(defaultExpenditureFormData);
    } else {
      setError("Terjadi kesalahan, coba lagi nanti!");
      ToastFailed();
    }
  };

  const fetchCategories = async () => {
    if (!userPublic?.id) return;

    try {
      const response = await apiService.get(`categories/${userPublic.id}`);
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
    if (!userPublic?.id) return;

    try {
      const response = await apiService.get(`sub-categories/${userPublic.id}`);
      if (Array.isArray(response)) {
        setSubCategories(response);
      } else {
        setError("Data sub kategori tidak ditemukan dalam format yang benar.");
      }
    } catch (error) {
      setError("Gagal mengambil data akun");
    }
  };

  const fetchAccounts = async () => {
    if (!userPublic?.id) return;

    try {
      const response = await apiService.get(`accounts/${userPublic.id}`);
      if (Array.isArray(response)) {
        setAccounts(response);
      } else {
        setError("Account tidak ditemukan dalam format yang benar.");
      }
    } catch (error) {
      setError("Gagal mengambil data akun");
    }
  };

  const handleFilterSubCategories = (categoryId: any) => {
    const result = subCategories.filter(
      (item) => item.category_id == categoryId
    );
    setSubCategoriesFiltered(result);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
    >
      <H3>Input Pengeluaran</H3>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="pengeluaran"
            className="block text-sm font-semibold text-gray-700"
          >
            Pengeluaran
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Masukkan pengeluaran"
          />
        </div>
        <div>
          <label
            htmlFor="tanggal"
            className="block text-sm font-semibold text-gray-700"
          >
            Tanggal
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date.toISOString().split("T")[0]}
            onChange={handleChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="account"
            className="block text-sm font-semibold text-gray-700"
          >
            Akun
          </label>
          <select
            id="account"
            name="accountId"
            value={formData.accountId}
            onChange={handleChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Pilih Akun</option>
            {accounts.map((cat, index) => (
              <option key={index} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="kategori"
            className="block text-sm font-semibold text-gray-700"
          >
            Kategori
          </label>
          <select
            id="kategori"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Pilih kategori</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.id}>
                {cat.name}
              </option>
            ))}
            ;
          </select>
        </div>
        <div>
          <label
            htmlFor="kategori"
            className="block text-sm font-semibold text-gray-700"
          >
            Sub Kategori
          </label>
          <select
            id="kategori"
            name="subCategoryId"
            value={formData.subCategoryId}
            onChange={handleChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option>Pilih Sub kategori</option>
            {subCategoriesFiltered.map((cat, index) => (
              <option key={index} value={cat.id}>
                {cat.name}
              </option>
            ))}
            ;
          </select>
        </div>
        <div>
          <label
            htmlFor="pengeluaran"
            className="block text-sm font-semibold text-gray-700"
          >
            Nominal
          </label>
          <input
            type="text"
            id="name"
            name="value"
            value={formData.value}
            onChange={handleChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Masukkan pengeluaran"
          />
        </div>
        <div className="col-span-2">
          <label
            htmlFor="keterangan"
            className="block text-sm font-semibold text-gray-700"
          >
            Keterangan
          </label>
          <textarea
            id="keterangan"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Masukkan keterangan"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Simpan
        </button>
      </div>
    </form>
  );
};
