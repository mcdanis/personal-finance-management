import { useState } from "react";
import { H3 } from "../../templates/LandingPage/components/headings";

export const IncomeTabContentData = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Pemasukan
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nominal
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tanggal
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">1</td>
            <td className="px-6 py-4 whitespace-nowrap">Alice</td>
            <td className="px-6 py-4 whitespace-nowrap">alice@example.com</td>
            <td className="px-6 py-4 whitespace-nowrap">Admin</td>
            <td className="">
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
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">2</td>
            <td className="px-6 py-4 whitespace-nowrap">Bob</td>
            <td className="px-6 py-4 whitespace-nowrap">bob@example.com</td>
            <td className="px-6 py-4 whitespace-nowrap">User</td>
            <td className="">
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
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">3</td>
            <td className="px-6 py-4 whitespace-nowrap">Charlie</td>
            <td className="px-6 py-4 whitespace-nowrap">charlie@example.com</td>
            <td className="px-6 py-4 whitespace-nowrap">User</td>
            <td className="">
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
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export const IncomeTabContentInput = () => {
  const [formData, setFormData] = useState({
    pengeluaran: "",
    tanggal: "",
    kategori: "",
    keterangan: "",
  });
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Proses pengiriman form
    console.log("Form submitted:", formData);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
    >
      <H3>Input Pemasukan</H3>
      <div>
        <label
          htmlFor="pengeluaran"
          className="block text-sm font-semibold text-gray-700"
        >
          Pemasukan
        </label>
        <input
          type="text"
          id="pengeluaran"
          name="pengeluaran"
          value={formData.pengeluaran}
          onChange={handleChange}
          className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Masukkan Pemasukan"
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
          id="tanggal"
          name="tanggal"
          value={formData.tanggal}
          onChange={handleChange}
          className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
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
          name="kategori"
          value={formData.kategori}
          onChange={handleChange}
          className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Pilih kategori</option>
          <option value="makanan">Makanan</option>
          <option value="transportasi">Transportasi</option>
          <option value="hiburan">Hiburan</option>
          <option value="lainnya">Lainnya</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="keterangan"
          className="block text-sm font-semibold text-gray-700"
        >
          Keterangan
        </label>
        <textarea
          id="keterangan"
          name="keterangan"
          value={formData.keterangan}
          onChange={handleChange}
          rows={4}
          className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Masukkan keterangan"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Kirim
        </button>
      </div>
    </form>
  );
};
