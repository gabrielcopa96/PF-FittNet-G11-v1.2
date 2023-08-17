import Swal from "sweetalert2";

//1er Agumento, "Title": Es el nombre del Error.
//2do "Text": Breve descripcion del error.
//3er "icon": Referencia al icono de la alerta, puede ser del tipo:
//"warning", "error" , "success" o "info"

export function SweetAlrt(title: any, text: any, icon: any) {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    iconColor: "#ff004c",
    allowOutsideClick: false,
    background: "#001519", //revisar que color es
    backdrop: true,
    confirmButtonColor: "#ff2767",
  });
}
export function SweetAlrtTem(text: any, icon: any) {
  Swal.fire({
    text: text,
    timer: 5000,
    timerProgressBar: true,
    icon: icon,
    iconColor: "#ff004c",
    allowOutsideClick: false,
    background: "#001519", //revisar que color es
    backdrop: true,
    showConfirmButton: false,
  });
}