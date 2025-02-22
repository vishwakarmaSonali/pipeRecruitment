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

export const getRandomColor = () => {
  const colors = [
    "#D34B72",
    "#D4C158",
    "#38658E",
    "#9BCD6A",
    "#6D58D4",
    "#CDA26A",
    "#6AAFCD",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
