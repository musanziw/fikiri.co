import Swal, { SweetAlertIcon } from "sweetalert2";

const toast = function (icon: SweetAlertIcon, title: string) {
  return Swal.fire({
    toast: true,
    icon,
    title,
    animation: true,
    position: "top-right",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
};

export { toast };
