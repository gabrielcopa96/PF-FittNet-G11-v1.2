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
    // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
    error.name = "El nombre es requerido y debe tener por lo menos dos letras";
  } 
  else if (Number(newGym.name))  {
    // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
    error.name = "No se puede ingresar Numeros!";
  }
   else if (!newGym.logo) {
    // @ts-expect-error TS(2339): Property 'logo' does not exist on type '{}'.
    error.logo = "El logo es requerido";
  } else if (!Number(newGym.price) || Number(newGym.price) < 0 || (newGym.price).includes(".")) {
    // @ts-expect-error TS(2339): Property 'price' does not exist on type '{}'.
    error.price = "Solo se puede ingresar numeros enteros";
  } else if (
    !Number(newGym.phone) ||
    Number(newGym.phone) < 0 ||
    newGym.phone.includes(".") ||
    newGym.phone.includes("-") ||
    newGym.phone.includes("+") ||
    newGym.phone.includes("$")
  ) {
    // @ts-expect-error TS(2339): Property 'phone' does not exist on type '{}'.
    error.phone =
      "El Telefono es requerido, Tene en cuenta que solo podes ingresar valores numericos";
  } else if (newGym.phone.length < 5) {
    // @ts-expect-error TS(2339): Property 'phone' does not exist on type '{}'.
    error.phone = "Ingrese un numero de Telefono Valido!";
  } else if (!regexEmail.test(newGym.email)) {
    // @ts-expect-error TS(2339): Property 'email' does not exist on type '{}'.
    error.email = "El Email ingresado es invalido";
  }

  return error;
}
export function gymValidateEdit(editGym: any) {
  let error = {};

  let tel= editGym.phone !== ""? editGym.phone:  editGym.phone=1 
     if (!regexName.test(editGym.name) && Number(editGym.name)) {
     // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
     error.name = "El nombre es requerido y debe tener por lo menos dos letras";
   } else if (Number(editGym.name)) {
     // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
     error.name = "No se puede ingresar Numeros!";
   } else if (!Number(editGym.price) || editGym.price < 0) {
     // @ts-expect-error TS(2339): Property 'price' does not exist on type '{}'.
     error.price = "Solo se puede ingresar numeros enteros positivos";
   } else if (Number(tel) < 0 && !Number(tel) ) {
     // @ts-expect-error TS(2339): Property 'phone' does not exist on type '{}'.
     error.phone =
       "El Telefono es requerido, Tene en cuenta que solo podes ingresar valores numericos";
   } else if ((tel).length < 5) {
     // @ts-expect-error TS(2339): Property 'phone' does not exist on type '{}'.
     error.phone = "Ingrese un numero de Telefono Valido!";
   } else if (!regexEmail.test(editGym.email)) {
     // @ts-expect-error TS(2339): Property 'email' does not exist on type '{}'.
     error.email = "El Email ingresado es invalido";
   }

  return error;
}

//!--------------------------VALIDACIONES DE PARTNER---------------------------------

export function partnerValidacion(input: any, target: any) {
  let error = {};
  if (target === "name" && Number(input.name)) {
    // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
    error.name = "No puedes Ingresar un numero";
  }
  if (target === "lastName" && Number(input.lastName)) {
    // @ts-expect-error TS(2339): Property 'lastName' does not exist on type '{}'.
    error.lastName = "No puedes ingresar un numero";
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
    // @ts-expect-error TS(2339): Property 'cbu' does not exist on type '{}'.
    error.cbu = "El CBU debe contener 16 numeros";
  }
  return error;
}

//!---------------------VALIDACIONES DE SERVICE--------------------------------

export function serviceValidate(newService: any) {
  let error = {};
  if (!newService.name || Number(newService.name)) {
    // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
    error.name = "El Nombre es requerido";
  } else if (!newService.description) {
    // @ts-expect-error TS(2339): Property 'description' does not exist on type '{}'... Remove this comment to see the full error message
    error.description = "La descripcion es requerida";
  } else if (!Number(newService.price)) {
    // @ts-expect-error TS(2339): Property 'price' does not exist on type '{}'.
    error.price = "Debes ingresar solo valores 'Numericos'";
  }
  return error;
}
export function serviceValidateEdit(editService: any) {
  let error = {};
  if (Number(editService.name)) {
    // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
    error.name = "No puedes ingresar numeros como nombre";
  }
  if (Number(editService.description)) {
    // @ts-expect-error TS(2339): Property 'description' does not exist on type '{}'... Remove this comment to see the full error message
    error.description = "No podes ingresar numeros en la descripcion";
  } else if (!Number(editService.price)) {
    // @ts-expect-error TS(2339): Property 'price' does not exist on type '{}'.
    error.price = "Debes ingresar solo valores 'Numericos'";
  }
  return error;
}
