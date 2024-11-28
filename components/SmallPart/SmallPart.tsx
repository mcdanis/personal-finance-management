import { toast } from "react-toastify";

export const ToastFailed = (msg = "Data gagal di input!") => {
  return toast.warning(msg);
};

export const ToastSuccess = (msg = "Data berhasil disimpan!") => {
  return toast.success(msg);
};
