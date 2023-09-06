import { toast } from "react-toastify";

export const showToast = (message, type = "info", options = {}) => {
  toast.dismiss();
  const toastMethod = getToastMethod(type);

  toastMethod(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    ...options,
  });
};

const getToastMethod = (type) => {
  switch (type) {
    case "success":
      return toast.success;
    case "error":
      return toast.error;
    case "warning":
      return toast.warning;
    case "info":
    default:
      return toast.info;
  }
};
