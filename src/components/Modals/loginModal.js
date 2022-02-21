import Swal from "sweetalert2";

export const LoginModal = Swal.mixin({
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  backdrop: true,
});
