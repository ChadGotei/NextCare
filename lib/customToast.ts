import { toast } from "sonner";

export const toastSuccess = (message: string) => {
  toast.success(message, {
    style: {
      background: "#0f766e",
      color: "#fff",
      borderRadius: "8px",
      padding: "12px",
    },
    position: "top-right",
    duration: 3000,
  });
};

export const toastError = (message: string) => {
  toast.error(message, {
    style: {
      background: "#b91c1c", 
      color: "#fff",
      borderRadius: "8px",
      padding: "12px",
    },
    position: "top-right",
    duration: 3000,
  });
};
