import axios from "axios";

// Para ver la estructura de los objetos entrar en InfoForms.jsx
// Ver el id que se pasa en cada caso (no es el mismo)


//----------------------------------------------------------------------------
// Esta función sirve para crear un gym           
//----------------------------------------------------------------------------

// @ts-expect-error TS(7030): Not all code paths return a value.
export async function createOneGym(dataForNewGym: any) {
    // new Gym es el objeto que guarda toda la info para crear el nuevo gym
    
    const newGym = await axios({
        method: "post",
        url: "/api/partner/gyms/createOneGym",
        data: dataForNewGym,
        headers: { "X-Requested-With": "XMLHttpRequest" },
        // withCredentials: true,
        })
        .then((res) => {
          return res.data;
        })
        // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
        .catch((error) => console.log(error));

    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log(newGym, 'cuando crea el gym');

    if (newGym) return true;
    if (!newGym) return false;

}

//----------------------------------------------------------------------------
// Esta función sirve para editar la info de un gym       
//----------------------------------------------------------------------------

// @ts-expect-error TS(7030): Not all code paths return a value.
export async function editOneGym(dataForEditGym: any) {
    // new Gym es el objeto que guarda toda la info para editar el nuevo gym
    
    const editGym = await axios({
        method: "put",
        url: "/api/partner/gyms/editOneGym",
        data: dataForEditGym,
        headers: { "X-Requested-With": "XMLHttpRequest" },
        // withCredentials: true,
        })
        .then((res) => {
          return res.data;
        })
        // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
        .catch((error) => console.log(error));

    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log(editGym, 'cuando edita el gym');

    if (editGym) return true;
    if (!editGym) return false;

}

//----------------------------------------------------------------------------
// Esta función sirve para crear un nuevo servicio
//----------------------------------------------------------------------------

// @ts-expect-error TS(7030): Not all code paths return a value.
export async function createOneService(dataForNewService: any) {
    // new Gym es el objeto que guarda toda la info para crear el nuevo servicio

    const newService = await axios({
        method: "post",
        url: "/api/partner/services/createOneService",
        data: dataForNewService,
        headers: { "X-Requested-With": "XMLHttpRequest" },
        // withCredentials: true,
        })
        .then((res) => {
          return res.data;
        })
        // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
        .catch((error) => console.log(error));

    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log(newService, 'cuando crea el service');

    if (newService) return true;
    if (!newService) return false;

}

//----------------------------------------------------------------------------
// Esta función sirve para editar un servicio creado
//----------------------------------------------------------------------------

// @ts-expect-error TS(7030): Not all code paths return a value.
export async function editOneService(dataForEditService: any) {
    // new Gym es el objeto que guarda toda la info para crear el nuevo servicio

    const editService = await axios({
        method: "put",
        url: "/api/partner/services/editOneService/",
        data: dataForEditService,
        headers: { "X-Requested-With": "XMLHttpRequest" },
        // withCredentials: true,
        })
        .then((res) => {
          return res.data;
        })
        // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
        .catch((error) => console.log(error));

    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log(editService, 'cuando edita el service');

    if (editService) return true;
    if (!editService) return false;

}