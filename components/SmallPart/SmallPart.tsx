import { toast } from "react-toastify";
import ApiService from "@/services/ApiService";

const apiService = new ApiService();

export const ToastFailed = (msg = "Data gagal di input!") => {
  return toast.warning(msg);
};

export const ToastSuccess = (msg = "Data berhasil disimpan!") => {
  return toast.success(msg, {
    autoClose: 2000,
  });
};

export const formatCurrency = (
  value: number,
  currency: string = "Rp"
): string => {
  return currency + new Intl.NumberFormat("id-ID").format(value);
};

export const handleDelete = async (route: string, selectedName: string) => {
  try {
    const response = await apiService.delete(route);

    if (response.ok) {
      ToastSuccess(`${selectedName} berhasil di hapus`);
      return true;
    } else {
      ToastFailed(`${selectedName} gagal di hapus`);
      return false;
    }
  } catch (error) {
    ToastFailed(
      `Terjadi kesalahan saat menghapus ${selectedName}, coba lagi !`
    );
    return false;
  }
};

export const jsonToString = (obj: object) => {
  return Object.entries(obj)
    .map(([key, value]) => `${value}`)
    .join("<br>");
};
