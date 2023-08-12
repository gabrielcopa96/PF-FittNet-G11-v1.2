export default function validate(input: any) {
    console.log(input, 'esto es input')
    let error = {};
    /* if (!input.name){
       error.name = 'un nombre es requerido'
   }else if(! /^[a-zA-Z ]*$/.test(input.name)){
       error.name = 'solo acepta letras'
   } */

    if (! /^[a-zA-Z ]*$/.test(input.lastname)) {
        (error as any).lastname = 'solo acepta letras'
    } else if (input.lastname?.length > 15) {
        (error as any).lastname = "superaste el maximo de caracteres"
    }

    if (!/^([0-9])*$/.test(input.phone)) {
        (error as any).phone = 'solo acepta numeros'
    } else if (input.phone > 0 && !/^\d{10}$/.test(input.phone)) {
        (error as any).phone = "debe ser un numero de diez digitos"
    }

    if (!/^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/) {
        (error as any).birthday = 'dd-mm-aa'
    }

    // if (!/^([0-9])*$/.test(input.street)) {
    //      error.street = 'solo acepta numeros'
    //  } else if (input.street?.length > 10) {
    //      error.street = "superaste el maximo de caracteres"
    // }
    
    // if (!/^([0-9])*$/.test(input.floor)) {
    //      error.floor = 'solo acepta numeros'
    // } else if (input.floor?.length > 10) {
    //   error.floor = "superaste el maximo de caracteres"
    // }
    if (!input.desease.length && (input.trainlimits.length || input.considerations.length)) {
        (error as any).desease = 'debes seleccionar las enfermedades que se realcionen con tu condicion'
    } 

    

    /* if (input.desease.length && input.trainlimits.length > 30) {
        error.trainlimits = "superaste el maximo de caracteres"
    } */
    if (input.trainlimits.length > 30){
        (error as any).trainlimits = "superaste el maximo de caracteres"
    }

    if (input.considerations.length > 30) {
        (error as any).considerations = "superaste el maximo de caracteres"
    }  

    if (!/^([0-9])*$/.test(input.address)) {
        (error as any).address = 'solo acepta numeros'
    } else if (input.address?.length > 10) {
        (error as any).address = "superaste el maximo de caracteres"
    }

    if (!/^([0-9])*$/.test(input.apartment)) {
        (error as any).apartment = 'solo acepta letras'
    } else if (input.apartment?.length > 10) {
        (error as any).apartment = "superaste el maximo de caracteres"
    }

    if (! /^[a-zA-Z ]*$/.test(input.neighborhood)) {
        (error as any).neighborhood = 'solo acepta letras'
    } else if (input.neighborhood?.length > 10) {
        (error as any).neighborhood = "superaste el maximo de caracteres"
    }


    if (! /^[a-zA-Z ]*$/.test(input.city)) {
        (error as any).city = 'solo acepta letras'
    } else if (input.city?.length > 15) {
        (error as any).city = "superaste el maximo de caracteres"
    }

    if (! /^[a-zA-Z ]*$/.test(input.country)) {
        (error as any).country = 'solo acepta letras'
    } else if (input.country?.length > 15) {
        (error as any).country = "superaste el maximo de caracteres"
    }

    if (!/^([0-9])*$/.test(input.zipCode)) {
        (error as any).zipCode = 'solo acepta numeros'
    } else if (input.zipCode?.length > 10) {
        (error as any).zipCode = "superaste el maximo de caracteres"
    }

    if (!/^([0-9])*$/.test(input.zipCode)) {
        (error as any).zipCode = 'solo acepta numeros'
    } else if (input.zipCode?.length > 10) {
        (error as any).zipCode = "superaste el maximo de caracteres"
    }




    /* if (!input.photo){
        error.photo = 'una foto es requerida'
    }else if(! /^[a-zA-Z ]*$/.test(input.photo)){
        error.photo = 'solo acepta letras'
    } */

    /* if (input.types.length === 0){
        error.types = 'debes seleccionar almenos un tipo'
    } else if(input.types.length > 2){
        error.types = 'maximo dos tipos'
    } */

    /*  if (!input.hp){
         error.hp = 'un numero es requerido'
     }else if(!/^([0-9])*$/.test(input.hp)){
         error.hp = 'solo acepta numeros'
     } */


    return error;
}