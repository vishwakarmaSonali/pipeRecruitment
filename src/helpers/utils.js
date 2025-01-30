import { toast } from "react-toastify";

export const notifySuccess = (success) => {
  toast.dismiss();
  toast.success(success, {
    position: "top-center",
    autoClose: 2000,
  });
};

export const notifyError = (error) => {
  toast.dismiss();
  toast.error(error, {
    position: "top-center",
    autoClose: 2000,
  });
};

export const notifyInfo = (error) => {
  toast.dismiss();
  toast.info(error, {
    position: "top-center",
    autoClose: 2000,
  });
};
