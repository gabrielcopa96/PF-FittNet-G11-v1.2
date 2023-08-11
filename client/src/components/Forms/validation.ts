export default function validate(input: any) {
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log(input, 'esto es input')
    let error = {};
    /* if (!input.name){
       error.name = 'un nombre es requerido'
   }else if(! /^[a-zA-Z ]*$/.test(input.name)){
       error.name = 'solo acepta letras'
   } */

    if (! /^[a-zA-Z ]*$/.test(input.lastname)) {
        // @ts-expect-error TS(2339): Property 'lastname' does not exist on type '{}'.
        error.lastname = 'solo acepta letras'
    } else if (input.lastname?.length > 15) {
        // @ts-expect-error TS(2339): Property 'lastname' does not exist on type '{}'.
        error.lastname = "superaste el maximo de caracteres"
    }

    if (!/^([0-9])*$/.test(input.phone)) {
        // @ts-expect-error TS(2339): Property 'phone' does not exist on type '{}'.
        error.phone = 'solo acepta numeros'
    } else if (input.phone > 0 && !/^\d{10}$/.test(input.phone)) {
        // @ts-expect-error TS(2339): Property 'phone' does not exist on type '{}'.
        error.phone = "debe ser un numero de diez digitos"
    }

    if (!/^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/) {
        // @ts-expect-error TS(2339): Property 'birthday' does not exist on type '{}'.
        error.birthday = 'dd-mm-aa'
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
        // @ts-expect-error TS(2339): Property 'desease' does not exist on type '{}'.
        error.desease = 'debes seleccionar las enfermedades que se realcionen con tu condicion'
    } 

    

    /* if (input.desease.length && input.trainlimits.length > 30) {
        error.trainlimits = "superaste el maximo de caracteres"
    } */
    if (input.trainlimits.length > 30){
        // @ts-expect-error TS(2339): Property 'trainlimits' does not exist on type '{}'... Remove this comment to see the full error message
        error.trainlimits = "superaste el maximo de caracteres"
    }

    if (input.considerations.length > 30) {
        // @ts-expect-error TS(2339): Property 'considerations' does not exist on type '... Remove this comment to see the full error message
        error.considerations = "superaste el maximo de caracteres"
    }  

    if (!/^([0-9])*$/.test(input.address)) {
        // @ts-expect-error TS(2339): Property 'address' does not exist on type '{}'.
        error.address = 'solo acepta numeros'
    } else if (input.address?.length > 10) {
        // @ts-expect-error TS(2339): Property 'address' does not exist on type '{}'.
        error.address = "superaste el maximo de caracteres"
    }

    if (!/^([0-9])*$/.test(input.apartment)) {
        // @ts-expect-error TS(2339): Property 'apartment' does not exist on type '{}'.
        error.apartment = 'solo acepta letras'
    } else if (input.apartment?.length > 10) {
        // @ts-expect-error TS(2339): Property 'apartment' does not exist on type '{}'.
        error.apartment = "superaste el maximo de caracteres"
    }

    if (! /^[a-zA-Z ]*$/.test(input.neighborhood)) {
        // @ts-expect-error TS(2339): Property 'neighborhood' does not exist on type '{}... Remove this comment to see the full error message
        error.neighborhood = 'solo acepta letras'
    } else if (input.neighborhood?.length > 10) {
        // @ts-expect-error TS(2339): Property 'neighborhood' does not exist on type '{}... Remove this comment to see the full error message
        error.neighborhood = "superaste el maximo de caracteres"
    }


    if (! /^[a-zA-Z ]*$/.test(input.city)) {
        // @ts-expect-error TS(2339): Property 'city' does not exist on type '{}'.
        error.city = 'solo acepta letras'
    } else if (input.city?.length > 15) {
        // @ts-expect-error TS(2339): Property 'city' does not exist on type '{}'.
        error.city = "superaste el maximo de caracteres"
    }

    if (! /^[a-zA-Z ]*$/.test(input.country)) {
        // @ts-expect-error TS(2339): Property 'country' does not exist on type '{}'.
        error.country = 'solo acepta letras'
    } else if (input.country?.length > 15) {
        // @ts-expect-error TS(2339): Property 'country' does not exist on type '{}'.
        error.country = "superaste el maximo de caracteres"
    }

    if (!/^([0-9])*$/.test(input.zipCode)) {
        // @ts-expect-error TS(2339): Property 'zipCode' does not exist on type '{}'.
        error.zipCode = 'solo acepta numeros'
    } else if (input.zipCode?.length > 10) {
        // @ts-expect-error TS(2339): Property 'zipCode' does not exist on type '{}'.
        error.zipCode = "superaste el maximo de caracteres"
    }

    if (!/^([0-9])*$/.test(input.zipCode)) {
        // @ts-expect-error TS(2339): Property 'zipCode' does not exist on type '{}'.
        error.zipCode = 'solo acepta numeros'
    } else if (input.zipCode?.length > 10) {
        // @ts-expect-error TS(2339): Property 'zipCode' does not exist on type '{}'.
        error.zipCode = "superaste el maximo de caracteres"
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