//!----------------VALIDACIONES DE INPUT---------------------
import {
  regexEmail,
  regexName,
} from "../../../asets/helpers/regexValidators";
const regCBU = /^[0-9]{16}\b/;
//!--------------------------------VALIDACIONES GYM----------------------
export function gymValidate(newGym: any) {
  let error = {};
  if (!regexName.test(newGym.name)) {
    (error as any).name = "El nombre es requerido y debe tener por lo menos dos letras";
  } 
  else if (Number(newGym.name))  {
    (error as any).name = "No se puede ingresar Numeros!";
  }
   else if (!newGym.logo) {
    (error as any).logo = "El logo es requerido";
  } else if (!Number(newGym.price) || Number(newGym.price) < 0 || (newGym.price).includes(".")) {
    (error as any).price = "Solo se puede ingresar numeros enteros";
  } else if (
    !Number(newGym.phone) ||
    Number(newGym.phone) < 0 ||
    newGym.phone.includes(".") ||
    newGym.phone.includes("-") ||
    newGym.phone.includes("+") ||
    newGym.phone.includes("$")
  ) {
    (error as any).phone =
      "El Telefono es requerido, Tene en cuenta que solo podes ingresar valores numericos";
  } else if (newGym.phone.length < 5) {
    (error as any).phone = "Ingrese un numero de Telefono Valido!";
  } else if (!regexEmail.test(newGym.email)) {
    (error as any).email = "El Email ingresado es invalido";
  }

  return error;
}
export function gymValidateEdit(editGym: any) {
  let error = {};

  let tel= editGym.phone !== ""? editGym.phone:  editGym.phone=1 
     if (!regexName.test(editGym.name) && Number(editGym.name)) {
     (error as any).name = "El nombre es requerido y debe tener por lo menos dos letras";
   } else if (Number(editGym.name)) {
     (error as any).name = "No se puede ingresar Numeros!";
   } else if (!Number(editGym.price) || editGym.price < 0) {
     (error as any).price = "Solo se puede ingresar numeros enteros positivos";
   } else if (Number(tel) < 0 && !Number(tel) ) {
     (error as any).phone =
       "El Telefono es requerido, Tene en cuenta que solo podes ingresar valores numericos";
   } else if ((tel).length < 5) {
     (error as any).phone = "Ingrese un numero de Telefono Valido!";
   } else if (!regexEmail.test(editGym.email)) {
     (error as any).email = "El Email ingresado es invalido";
   }

  return error;
}

//!--------------------------VALIDACIONES DE PARTNER---------------------------------

export function partnerValidacion(input: any, target: any) {
  let error = {};
  if (target === "name" && Number(input.name)) {
    (error as any).name = "No puedes Ingresar un numero";
  }
  if (target === "lastName" && Number(input.lastName)) {
    (error as any).lastName = "No puedes ingresar un numero";
  }
  // if (!regexEmail.test(input.email)) {
  //   error.email = "Email Invalido";
  // }
  // if (!Number(input.phone)) {
  //   error.phone = "Solo se Permiten valores Numericos";
  // }
  //  if (input.phone.length < 5) {
  //   error.phone = "Ingrese un numero de Telefono Valido!";
  // }
  if (target === "cbu" && !regCBU.test(input.cbu)) {
    (error as any).cbu = "El CBU debe contener 16 numeros";
  }
  return error;
}

//!---------------------VALIDACIONES DE SERVICE--------------------------------

export function serviceValidate(newService: any) {
  let error = {};
  if (!newService.name || Number(newService.name)) {
    (error as any).name = "El Nombre es requerido";
  } else if (!newService.description) {
    (error as any).description = "La descripcion es requerida";
  } else if (!Number(newService.price)) {
    (error as any).price = "Debes ingresar solo valores 'Numericos'";
  }
  return error;
}
export function serviceValidateEdit(editService: any) {
  let error: any = {};
  if (Number(editService.name)) {
    (error as any).name = "No puedes ingresar numeros como nombre";
  }
  if (Number(editService.description)) {
    error.description = "No podes ingresar numeros en la descripcion";
  } else if (!Number(editService.price)) {
    error.price = "Debes ingresar solo valores 'Numericos'";
  }
  return error;
}
