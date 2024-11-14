import Link from "next/link";
import { useState } from "react";

export const ExpenditureEdit = () => {
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
      <div>
        <label
          htmlFor="pengeluaran"
          className="block text-sm font-semibold text-gray-700"
        >
          Pengeluaran
        </label>
        <input
          type="text"
          id="pengeluaran"
          name="pengeluaran"
          value={formData.pengeluaran}
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

export const IncomeEdit = () => {
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
      <div>
        <label
          htmlFor="pengeluaran"
          className="block text-sm font-semibold text-gray-700"
        >
          Pengeluaran
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
