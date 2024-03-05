'use client'
import Swal, {SweetAlertIcon} from "sweetalert2";

const Toast = function (icon: SweetAlertIcon, title: string) {
    return Swal.fire({
        toast: true,
        icon,
        title,
        animation: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: false,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });
};

export {Toast};
